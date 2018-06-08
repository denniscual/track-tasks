## track-tasks
A command line tool where it will display all the files , in recursive way, that includes special commented text - **TODO** and **FIXME**. It uses [Glob Pattern](https://www.npmjs.com/package/minimatch) to match files.

*Note: You need to have installed Node 6+.*

## Install

```bash
npm install track-tasks --global
```

## Usage

![Alt Text](https://media.giphy.com/media/8mBV2Aqq0RfhXeQCgl/giphy.gif)

#### TODO
Displaying the TODO tasks

```bash
tasks todo [glob pattern]
```

#### FIXME
Displaying the FIXME tasks

```bash
tasks fixme [glob pattern]
```

## Changelog
This project adheres to [Semantic Versioning](http://semver.org/).
Every release, along with the migration instructions, is documented on the Github [Releases](https://github.com/denniscual/find-text/releases) page.

## License

[MIT](https://opensource.org/licenses/MIT)
