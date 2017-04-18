# svg-mountain-range
The [svg-mountain-range](http://www.github.com/garyhwilson/svg-mountain-range) library comes from an effort to produce a highly configurable and procedurally generated mountain range SVG. It's original intent was for an old-fashioned pot-shot canon game where players take turns plotting angles and power in an attempt to shoot and destroy their opponent by lobbing rounds over mountain peaks.
![sample mountain range image](https://cloud.githubusercontent.com/assets/25516625/25056638/0aa45456-211f-11e7-87c8-ca0a47e11b4c.png "sample mountain range image")
## Installation
Install svg-mountain-range from npm:

```bash
npm install svg-mountain-range
```
## Usage
The following code can be used to create an SVG graphic with the default configuration:
##### Minimum Example
```javascript
var Mountains = new SVGMountainRange();
var svg = Mountains.create();
document.body.appendChild(svg);
```

Optionally, you can provide a configuration object to customize the SVG.

##### Configuration Example
```javascript
var config = {
  stage: {
    height: 400,
    width: 800
  },
  peaks: {
    detail: 3.4,
    maxY: 350,
    minY: 200
  },
  valleys: {
    minY: 50
  },
};
```

## Configuration
The `create()` method accepts a JSON configuration object to customize every aspect of rendering the mountain range SVG.

```javascript
var svg = Mountains.create(config);
```

### stage
Type: `Object`

The `stage` object defines the size of the SVG rendering.
### stage.height
Type: `Number` Default value: `300`

A number value that defines the height of the SVG.

```javascript
height: 300
```
### stage.width
Type: `Number` Default value: `600`

A number value that defines the width of the SVG.

```javascript
width: 600
```
### peaks
Type: `Object`

The `peaks` object defines the high and low points of the mountain range as well as the level of detail.
### peaks.count
Type: `Number` Default value: `1`

A number value that defines the number of mountain peaks.

```javascript
width: 1
```
### peaks.detail
Type: `Number` Default value: `4`

A number value that defines the amount of detail. A value of 1 would be minimal detail while higher numbers add more subdivisions.

```javascript
detail: 4
```
### peaks.maxY
Type: `Number` Default value: `300`

A number value that defines the highest y-value a peak can have.

```javascript
maxY: 300
```
### peaks.minY
Type: `Number` Default value: `200`

A number value that defines the lowest y-value a peak can have.

```javascript
maxY: 200
```
### valleys
Type: `Object`

The `valleys` object defines the lower limit of the valleys in the mountain range SVG.
### valleys.minY
Type: `Number` Default value: `50`

A number value that defines the lowest y-value a value can have.

```javascript
maxY: 50
```
### flats
Type: `Array`

An array of objects in which each object defines a flattened portion of the SVG.

### flats.align
Type: `String` Default value: `left`

A string value that sets the alignment as either `'left'`, `'center'`, or `'right'` of the `flats.pos` value.

```javascript
name: 'right'
```
### flats.name
Type: `String`

A string value that will be an identifier for a flattened section of the SVG.

```javascript
name: 'platform1'
```
### flats.pos
Type: `Number`

A number value from 0 to 1 that represents the position of the platform from the left edge of the SVG.

```javascript
pos: 0.25
```
### flats.width
Type: `Number`

A string value for the width, in pixels, of the defined platform.

```javascript
width: 70
```
### fill
Type: `Object`

The `fill` object defines how the SVG is filled; be it a solid color or a gradient.
### fill.color
Type: `String`

A string value formatted as a hex-based RGB color that will be the main fill color for the SVG.

```javascript
color: '#c0c0c0'
```
### fill.gradient
Type: `Object`

The `fill.gradient` object defines the gradient used to fill the SVG mountain range.
### fill.gradient.stops
Type: `Array`

An array of objects that define gradient stops for the fill.
### fill.gradient.stops.offset
Type: `String`

A string value that's a percentage used to define the gradient offset.

```javascript
offset: '10%'
```
### fill.gradient.stops.stop-color
Type: `String`

A string value formatted as a hex-based RGB color that will be the gradient stop-color for the SVG at a point defined by the offset.

```javascript
'stop-color': '#fa902b'
```
### fill.gradient.x1
Type: `String`

A string value that's a percentage used to set the first fill x-value.

```javascript
x1: '0%'
```
### fill.gradient.y1
Type: `String`

A string value that's a percentage used to set the first fill y-value.

```javascript
y1: '0%'
```
### fill.gradient.x2
Type: `String`

A string value that's a percentage used to set the last fill x-value.

```javascript
x2: '0%'
```
### fill.gradient.y2
Type: `String`

A string value that's a percentage used to set the last fill y-value.

```javascript
y2: '0%'
```
### shadow
Type: `Object`

The `shadow` object defines how the SVG shadows are filled; be it a solid color or a gradient.
### shadow.color
Type: `String`

A string value formatted as a hex-based RGB color that will be the main fill color for the shadows in the SVG.

```javascript
color: '#c0c0c0'
```
### shadow.gradient
Type: `Object`

The `shadow.gradient` object defines the gradient used to fill the shadows in the SVG mountain range.
### shadow.gradient.stops
Type: `Array`

An array of objects that define gradient stops for the shadows.
### shadow.gradient.stops.offset
Type: `String`

A string value that's a percentage used to define the gradient offset.

```javascript
offset: '10%'
```
### shadow.gradient.stops.stop-color
Type: `String`

A string value formatted as a hex-based RGB color that will be the gradient stop-color for the SVG at a point defined by the offset.

```javascript
'stop-color': '#fa902b'
```
### shadow.gradient.x1
Type: `String`

A string value that's a percentage used to set the first shadow x-value.

```javascript
x1: '0%'
```
### shadow.gradient.y1
Type: `String`

A string value that's a percentage used to set the first shadow y-value.

```javascript
y1: '0%'
```
### shadow.gradient.x2
Type: `String`

A string value that's a percentage used to set the last shadow x-value.

```javascript
x2: '0%'
```
### shadow.gradient.y2
Type: `String`

A string value that's a percentage used to set the last shadow y-value.

```javascript
y2: '0%'
```
### ridge
Type: `Object`

This `ridge` object defines a stroke for the top contour of the mountain range SVG.
### ridge.color
Type: `String`

A string value formatted as a hex-based RGB color that will be the the stroke color.

```javascript
color: '#000000'
```
### ridge.thickness
Type: `Number`

A number value that sets the stroke size in pixels.

```javascript
thickness: 5
```
