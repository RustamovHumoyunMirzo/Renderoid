const registry = new Map()

export function registerView(tagName, ViewClass) {
  registry.set(tagName, ViewClass)
}

export function createView(tagName, props) {
  const ViewClass = registry.get(tagName)

  if (!ViewClass) {
    throw new Error(`View "${tagName}" is not registered.`)
  }

  return new ViewClass(props)
}