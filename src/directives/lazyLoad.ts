import type { DirectiveBinding, ObjectDirective } from 'vue'

const lazyLoad: ObjectDirective = {
  mounted(el: HTMLElement, binding: DirectiveBinding<any>) {
    console.log(binding)

    // const elRect = el.getBoundingClientRect()
    //
    // let containerRect: Pick<DOMRect, 'top' | 'bottom' | 'left' | 'right'>
    // if (container instanceof Element) {
    //   containerRect = container.getBoundingClientRect()
    // } else {
    //   containerRect = {
    //     top: 0,
    //     right: window.innerWidth,
    //     bottom: window.innerHeight,
    //     left: 0
    //   }
    // }
    // return (
    //   elRect.top < containerRect.bottom &&
    //   elRect.bottom > containerRect.top &&
    //   elRect.right > containerRect.left &&
    //   elRect.left < containerRect.right
    // )
  },
  updated(el, binding) {
    console.log(binding)
  },
  unmounted() {}
}

export default lazyLoad
