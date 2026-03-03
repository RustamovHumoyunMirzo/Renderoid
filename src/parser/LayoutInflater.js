import { LinearLayout } from '../layout/LinearLayout.js'
import { TextView } from '../layout/TextView.js'
import { parseXML } from './XMLParser.js'

export function inflateXMLNode(node) {
  const attrs = {}

  for (let i = 0; i < node.attributes.length; i++) {
    const attr = node.attributes[i]
    const name = attr.name.replace('android:', '')
    attrs[name] = attr.value
  }

  let view

  switch (node.nodeName) {
    case 'LinearLayout':
      view = new LinearLayout({
        layoutWidth: attrs.layout_width,
        layoutHeight: attrs.layout_height,
        orientation: attrs.orientation
      })
      break
    case 'TextView':
      view = new TextView({
        layoutWidth: attrs.layout_width,
        layoutHeight: attrs.layout_height,
        text: attrs.text,
        textColor: attrs.textColor,
        fontSize: attrs.fontSize ? parseInt(attrs.fontSize) : undefined
      })
      break
    default:
      console.warn(`Unknown tag: ${node.nodeName}, defaulting to View`)
      view = new LinearLayout({
        layoutWidth: attrs.layout_width,
        layoutHeight: attrs.layout_height
      })
      break
  }

  node.childNodes.forEach(childNode => {
    if (childNode.nodeType === 1) {
      const childView = inflateXMLNode(childNode)
      view.addView(childView)
    }
  })

  return view
}

export function inflateXMLString(xmlString) {
  const rootNode = parseXML(xmlString)
  return inflateXMLNode(rootNode)
}
