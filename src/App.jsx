import React, { useState, useEffect } from 'react';
import { Search, MapPin, Image as ImageIcon } from 'lucide-react';

const BangumiIds = {
  "負けヒロインが多すぎる！": "464376",
  "ゆるキャン△": "207195",
};

const AnimeLocationViewer = () => {
  const [bangumiId, setBangumiId] = useState(""); 
  const [animeData, setAnimeData] = useState(null);
  const [detailData, setDetailData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [expandedLocations, setExpandedLocations] = useState({});

  const fetchData = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const basicResponse = await fetch(`https://api.anitabi.cn/bangumi/${id}/lite`);
      if (!basicResponse.ok) throw new Error('Failed to fetch basic data');
      const basicData = await basicResponse.json();
      setAnimeData(basicData);

      const detailResponse = await fetch(`https://api.anitabi.cn/bangumi/${id}/points/detail`);
      if (!detailResponse.ok) throw new Error('Failed to fetch detailed data');
      const detailData = await detailResponse.json();

      detailData.sort((a, b) => {
        if (a.ep === "OP") return -1;
        if (b.ep === "OP") return 1;

        const epA = parseInt(a.ep);
        const epB = parseInt(b.ep);

        if (isNaN(epA) || epA > 12) return 1; 
        if (isNaN(epB) || epB > 12) return "-";

        return epA - epB;
      });

      setDetailData(detailData);
    } catch (err) {
      setError('Failed to load anime location data. Please try again.');
    }
    setLoading(false);
  };

  useEffect(() => {
    if (bangumiId) {
      fetchData(bangumiId);
    }
  }, [bangumiId]);

  const AnimeSelect = (event) => {
    setBangumiId(event.target.value);
  };

  const toggleExpandLocation = (locationId) => {
    setExpandedLocations((prevState) => ({
      ...prevState,
      [locationId]: !prevState[locationId]
    }));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black p-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-4 text-white">Anime Location Viewer</h1>

          <div className="flex gap-4 mb-4">
            <select 
              className="px-4 py-2 border rounded-lg bg-white"
              value={BangumiIds}
              onChange={AnimeSelect}
            >
              <option value="">Please select anime you want to view the location</option>
              {Object.entries(BangumiIds).map(([name, id]) => (
                <option key={id} value={id}>{name}</option>
              ))}
            </select>
            
            <button
              onClick={() => bangumiId && fetchData(bangumiId)}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-600 transition-colors"
              disabled={!bangumiId}
            >
              <Search size={20} />
              Load Locations
            </button>
          </div>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {animeData && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center gap-4">
                <img 
                  src={animeData.cover} 
                  alt={animeData.title} 
                  className="w-[10vh] h-[50] object-cover rounded"
                />
                <div>
                  <div className="text-2xl font-bold">{animeData.title}</div>
                  <div className="text-gray-500">{animeData.city || 'N/A'}</div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 text-sm mt-4">
                <div>
                  <span className="font-semibold">City:</span> {animeData.city || 'N/A'}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {detailData.map((point) => (
                <div key={point.id} className="bg-white rounded-lg shadow overflow-hidden">
                  <div className="relative h-48">
                    <img 
                      src={point.image ? point.image.replace('h160', 'h360') : 'https://via.placeholder.com/360'} 
                      alt={point.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold mb-2">{point.name}</h3>
                    {point.origin && (
                      <a 
                        href={point.originURL} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-sm text-blue-500 hover:text-blue-600 mb-2 block"
                      >
                        Source: {point.origin}
                      </a>
                    )}
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <ImageIcon size={16} />
                        Episode {point.ep || '-'}
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin size={16} />
                        {point.geo.map(coord => coord.toFixed(4)).join(', ')}
                      </div>
                    </div>

                    {point.moreImages && point.moreImages.length > 0 && (
                      <button
                        onClick={() => toggleExpandLocation(point.id)}
                        className="text-blue-500 mt-2"
                      >
                        {expandedLocations[point.id] ? 'Hide Images' : 'View More Images'}
                      </button>
                    )}
                    {expandedLocations[point.id] && point.moreImages && (
                      <div className="grid grid-cols-2 gap-2 mt-2">
                        {point.moreImages.map((image, idx) => (
                          <img 
                            key={idx}
                            src={image.replace('h160', 'h360')}
                            alt={`Additional view ${idx + 1}`}
                            className="w-full h-24 object-cover"
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AnimeLocationViewer;
