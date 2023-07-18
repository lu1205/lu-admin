// 防抖函数(自定义是否立即执行)
export function debounce(
  fn: Function,
  delay: number = 1000,
  immediate: boolean = true
) {
  let timer: any = null
  return function (args: Array<any>) {
    if (immediate && !timer) {
      fn.apply(this, args)
    }
    timer && clearTimeout(timer)
    timer = setTimeout(function () {
      if (!immediate) {
        fn.apply(this, args)
      }
      timer = null
    }, delay)
  }
}

//节流(自定义是否立即执行)
export const throttle = (
  fn: Function,
  delay: number = 1000,
  immediate: boolean = true
) => {
  let timer: any = null
  function resultFunc(args: any) {
    if (immediate && !timer) {
      fn.apply(this, args)
      timer = setTimeout(() => {
        timer = null
      }, delay)
    }
    if (timer) return
    timer = setTimeout(() => {
      fn.apply(this, args)
      timer = null
    }, delay)
  }

  resultFunc.cancel = function () {
    clearTimeout(timer)
  }

  return resultFunc

  /*  if (immediate) {
    return function (args: Array<any>) {
      if (!timer) {
        fn.apply(this, args)
        timer = setTimeout(() => {
          timer = null
        }, delay)
      }
    }
  }
  return function (args: Array<any>) {
    if (timer) return
    timer = setTimeout(() => {
      fn.apply(this, args)
      timer = null
    }, delay)
  } */
}
// 防抖函数(自定义是否立即执行且可以中断)
export function debounce2(
  fn: Function,
  delay: number = 1000,
  immediate: boolean = true
) {
  // 计时器
  let timerId = null
  // flag为真时立即执行
  let flag = true
  let resultFunc = null
  if (immediate) {
    // 立即执行
    //  例如：用户在输入框中输入字符,输入第一个字符时，立即执行一次
    // 之后，最终间隔超过2秒后，才执行补全查询
    resultFunc = function (args: any) {
      clearTimeout(timerId)
      if (flag) {
        fn.apply(this, args)
        flag = false
      }
      timerId = setTimeout(() => {
        flag = true
      }, delay)
    }

    resultFunc.cancel = function () {
      // 例如，用户打字很快，然后输入完成后，未达到两秒钟就移动鼠标
      // 此时输入框失去焦点，触发取消等待方法，立刻执行补全查询操作并显示结果出来

      console.log('立即取消等待')
      clearTimeout(timerId)
      flag = true
    }
  } else {
    // 不立即执行
    //  例如：用户在输入框中输入字符，最终间隔超过2秒后，才执行补全查询

    resultFunc = function (args: any) {
      clearTimeout(timerId)
      timerId = setTimeout(() => {
        fn.apply(this, args)
      }, delay)
    }

    resultFunc.cancel = function () {
      console.log('立即取消等待')
      clearTimeout(timerId)
    }
  }
  return resultFunc
}

// 节流函数(自定义是否立即执行且可以中断)
export function throttle2(
  fn: Function,
  delay: number = 1000,
  immediate: boolean = true
) {
  let flag = true
  let timer = null

  let resultFunc = null

  if (immediate) {
    // 立即执行
    resultFunc = function (args: any) {
      if (flag) {
        fn.apply(this, args)
        flag = false
        timer = setTimeout(() => {
          flag = true
        }, delay)
      }
    }

    resultFunc.cancel = function () {
      console.log('立即取消等待')
      clearTimeout(timer)
    }
  } else {
    // 不立即执行
    resultFunc = function (args: any) {
      if (flag == true) {
        flag = false
        timer = setTimeout(() => {
          fn.apply(this, args)
          flag = true
        }, delay)
      }
    }

    resultFunc.cancel = function () {
      console.log('立即取消等待')
      clearTimeout(timer)
      flag = true
    }
  }

  return resultFunc
}

// 节流函数-时间戳(自定义是否立即执行且可以中断)

export function throttle3(
  fn: Function,
  delay: number = 1000,
  immediate: boolean = true
) {
  let timer: any = null
  let preTime: number = 0
  function resultFunc(args: any) {
    const currentTime = Date.now()
    if (immediate && currentTime - preTime >= delay) {
      fn.apply(this, args)
      preTime = currentTime
    }
    if (currentTime - preTime < delay) return
    preTime = currentTime
    timer = setTimeout(() => {
      fn.apply(this, args)
    }, delay)
  }

  resultFunc.cancel = function () {
    clearTimeout(timer)
  }

  return resultFunc
}

// 防抖函数-时间戳(自定义是否立即执行且可以中断)
export function debounce3(
  fn: Function,
  delay: number = 1000,
  immediate: boolean = true
) {
  let timer: any = null
  let preTime: number = 0
  function resultFunc(args: any) {
    clearTimeout(timer)
    timer = setTimeout(function () {
      fn.apply(this, args)
    }, delay)

    const currentTime = Date.now()
    if (immediate && currentTime - preTime >= delay) {
      fn.apply(this, args)
      preTime = currentTime
    }
    clearTimeout(timer)
    preTime = currentTime
    if (!immediate) {
      timer = setTimeout(() => {
        fn.apply(this, args)
      }, delay)
    }
  }

  resultFunc.cancel = function () {
    clearTimeout(timer)
  }

  return resultFunc
}
