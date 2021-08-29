const draggableElements = new WeakMap()

// TODO: consider idea to extend Node addEventListener/removeEventListener
export const attachEventListener = (node: Node, event: string, callback: (event: Event) => void, props?: any) => {
  if (!node) {
    throw new Error('attachEventListener(node, event, callback, props): node parameter shouldn be a HTML Node')
  }

  if (event === 'custom:drag') {
    draggableElements.set(node, true)
  }

  node.addEventListener(event, callback, props)

  return () => node.removeEventListener(event, callback, props)
}

attachEventListener(document, 'mousedown', () => {
  const dragStartUnsubscriber = attachEventListener(document, 'mousemove', (ev) => {
    dragStartUnsubscriber()

    // console.log('move', ev.target)

    const event = new MouseEvent('custom:dragstart', {
      bubbles: true,
      cancelable: true,
      clientX: ev.clientX,
      clientY: ev.clientY,
    })

    ev.target.dispatchEvent(event)
  })

  const dragmoveUnsubscriber = attachEventListener(document, 'mousemove', (ev) => {
    // console.log('move', ev.target)
    const event = new MouseEvent('custom:dragover', {
      bubbles: true,
      cancelable: true,
      clientX: ev.clientX,
      clientY: ev.clientY,
    })

    ev.target.dispatchEvent(event)
  })

  const mouseUpUnsubscriber = attachEventListener(document, 'mouseup', (ev) => {
    dragmoveUnsubscriber()
    mouseUpUnsubscriber()

    const event = new MouseEvent('custom:drop', {
      bubbles: true,
      cancelable: true,
      clientX: ev.clientX,
      clientY: ev.clientY,
    })

    ev.target.dispatchEvent(event)
  })
})

const filterDomByWalkingToTheTop = (node, fn, result = []): Node[] => {
  const nextResult = fn(node) ? [...result, node] : result

  return node.parentNode ? filterDomByWalkingToTheTop(node.parentNode, fn, nextResult) : nextResult
}

attachEventListener(document, 'custom:dragstart', ({ clientX: startX, clientY: startY, target }) => {
  const activeDraggableNodes = filterDomByWalkingToTheTop(target, (node) => draggableElements.has(node))

  if (activeDraggableNodes.length === 0) return

  const stopDragOver = attachEventListener(document, 'custom:dragover', ({ clientX, clientY }) => {
    activeDraggableNodes.map((node) => {
      const event = new MouseEvent('custom:drag', {
        bubbles: false, //TODO: implement bubbles
        cancelable: false, //TODO: implement cancelable
        clientX: clientX,
        clientY: clientY,
        movementX: clientX - startX,
        movementY: clientY - startY,
      })

      node.dispatchEvent(event)
    })
  })

  const stopDrop = attachEventListener(document, 'custom:drop', () => {
    stopDragOver()
    stopDrop()
  })
})

// attachEventListener(document.body, 'custom:drag', (event) => {
//   console.log('document.body => custom:drag', event.movementX, event.movementX)
// })
//
// const testEl = document.querySelector('#testDraggable')
// console.log(testEl)
// attachEventListener(testEl, 'custom:drag', ({ movementX, movementY }) => {
//   testEl.style.left = `${movementX}px`
//   testEl.style.top = `${movementY}px`
// })
