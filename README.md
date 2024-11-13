# FOR EDUCATION PURPOSE 🎓
> >
> > #### MAKE FOR NON MANDARIN READERS  ALSO PLEASE VISIT THE  MAIN DOCUMENT  > https://github.com/anitabi/anitabi.cn-document/blob/main/api.md < Thanks
 
# 🔧 Open API

## Base API Addresses
* Data API base URL: `https://api.anitabi.cn/`
* Image API base URL: `https://image.anitabi.cn/`

> **Important**: Do not request the main domain `https://anitabi.cn/` under any circumstances, as it does not guarantee stability of any **resource addresses** or **data structures**

## API Endpoints

### Get Pilgrimage Landmark Information by Bangumi ID
`GET` `https://api.anitabi.cn/bangumi/${subjectID}/lite`

#### Example Response Structure:
```json
{
    "id": 115908,
    "cn": "Sound! Euphonium",
    "title": "響け！ユーフォニアム",
    "city": "Uji City",
    "cover": "https://image.anitabi.cn/bangumi/115908.jpg?plan=h160",
    "color": "#02a7bd",
    "geo": [
        34.90646037778022,
        135.81221398475236
    ],
    "zoom": 12.383488825333831,
    "modified": 1674702846652,
    "litePoints": [
        {
            "id": "qys7fu",
            "cn": "Kyoto Concert Hall",
            "name": "京都コンサートホール",
            "image": "https://image.anitabi.cn/points/115908/qys7fu.jpg?plan=h160",
            "ep": 1,
            "s": 1,
            "geo": [
                35.0503,
                135.7664
            ]
        }
    ],
    "pointsLength": 388,
    "imagesLength": 388
}
```

## Property Descriptions

### `liteBangumi` (Light version of work's pilgrimage information)
* `id`: Bangumi work's `subjectID`
* `cn`: Chinese translation of the work
* `title`: Original title of the work
* `city`: Main city where landmarks are located (may be empty)
* `cover`: Work's cover image
* `color`: Work's main color
* `geo[]`: Default GPS coordinates for the work
* `zoom`: Default zoom level
* `modified`: Last data update timestamp
* `litePoints[]`: First ten iconic landmark information
* `pointsLength`: Total number of landmarks
* `imagesLength`: Number of landmarks with screenshots

### `litePoints` (Light version of landmark information)
* `id`: Landmark ID
* `cn`: Chinese translation of landmark name
* `name`: Original landmark name (defaults to local language)
* `image`: Thumbnail of corresponding screenshot
* `ep`: Episode number
* `s`: Screenshot timestamp in seconds
* `geo[]`: Landmark GPS information

## Image Resolution Options

When working with thumbnail URLs, you can:
* Replace `?plan=h160` with `?plan=h360` for higher resolution
* Get mobile-friendly full-width size
* Remove `?plan=h160` completely for full-size image (not recommended for display interfaces due to server load)

## Helper Functions

### Get Pilgrimage Map URL by Bangumi ID
```javascript
function getAnitabiSubjectURLById(id){
    return `https://anitabi.cn/map?bangumiId=${id}`
}
```

## Detailed API Endpoints

### Get Detailed Landmark Information by Bangumi ID
`GET` `https://api.anitabi.cn/bangumi/${subjectID}/points/detail`

#### QueryString Parameters:
* `haveImage=true`: Filter landmarks with images

> **Note**: When using this API to display landmark screenshots, it's recommended to show the `origin` text and implement `originURL` links, as Anitabi's screenshots come from various sources.

#### Example Response Structure:
```json
[
    {
        "id": "5qypywi9",
        "name": "Second Hashibetsu Bus Stop (West of Hashibetsu Station)",
        "image": "https://image.anitabi.cn/points/126461/5qypywi9.jpg?plan=h160",
        "ep": 1,
        "s": 282,
        "geo": [
            43.8578,
            141.5462
        ],
        "origin": "Google Maps",
        "originURL": "https://www.google.com/maps/d/viewer?mid=1hkF1issn0oVQDeN4BIrBPp5b5Ek&ll=43.857864%2C141.546264&z=17"
    }
]
```

---

*This content is shared under CC BY-NC-SA 4.0 license (Attribution-NonCommercial-ShareAlike).*

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
