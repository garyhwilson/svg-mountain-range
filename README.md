# svg-mountain-range
The SVGMountainRange library comes from an effort to produce a highly configurable and procedurally generated SVG mountain range graphic. It's original intent was for an old-fashioned pot-shot canon game where players take turns plotting angles and power in an attempt to shoot and destroy their opponent by lobbing rounds over mountain peaks.

### Installation
Install svg-mountain-range from npm:

```bash
npm install svg-mountain-range
```
### Usage
The following code can be used to create an SVG graphic with the default configuration:
##### Minimum Example
```javascript
var Mountains = new SVGMountainRange();
var svg = Mountains.create();
document.body.appendChild(svg);
```

Alternatively, you can provide a configuration object to customize the SVG graphic.

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

var Mountains = new SVGMountainRange();
var svg = Mountains.create(config);
document.body.appendChild(svg);
```
