import path from 'path'
import fs from 'fs'

function requireDirectory(pathName: string) {
  fs.readdirSync(pathName).forEach((filename) => {
    let joined: string = path.join(pathName, filename)

    if (fs.statSync(joined).isDirectory()) {
      requireDirectory(joined)
    } else if (checkFileExt(joined)) {
      module.require(joined)
    }
  })
}

function checkFileExt(filename: string): boolean {
  filename = filename.toLowerCase()
  if (filename.endsWith('.js') && !filename.endsWith('.map.js')) {
    return true
  }
  return false
}

export { requireDirectory }
