import { ViewGroup } from '../core/ViewGroup.js'
import { registerView } from '../core/ViewRegistry.js'
import { VerticalLayout } from '../layouts/VerticalLayout.js'
import { HorizontalLayout } from '../layouts/HorizontalLayout.js'

export class LinearLayout extends ViewGroup {

  static tag = 'LinearLayout'

  constructor(props = {}) {
    super(props)

    const orientation = props.orientation || 'vertical'

    this.layoutStrategy =
      orientation === 'horizontal'
        ? new HorizontalLayout()
        : new VerticalLayout()
  }
}

registerView(LinearLayout.tag, LinearLayout)