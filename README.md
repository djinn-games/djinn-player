# djinn-player

Runtime environment for [Djinn](https://www.github.com/djinn-games).

### Development

#### Include missing module: `djinn-parser`

There is a module that `djinn-player` needs and it's not published yet on NPM. You need to manually fetch that module and use `npm link` to set it up.

On a directory *outside* `djinn-player`:

```
git clone git@github.com:djinn-games/djinn-parser.git
cd djinn-parser
npm link
```

And the run *inside* `djinn-player` directory:

```
npm link djinn-parser
```

If you are on a Mac, you might need to `unlink` it once this module is published ([read why](https://blog.wanderview.com/blog/2013/01/15/time-machine-and-npm/)).
