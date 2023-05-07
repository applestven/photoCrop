
// 多次执行最后一次 
export function debounceS(func, delay,that) {// 执行最后一次 
    let context = that // this指向发生变化，需要提出来
    let args = arguments
    return function () {
      if (context.timeout) {
        clearTimeout(context.timeout)
      }
      context.timeout = setTimeout(() => {
        func.apply(context, args)
      }, delay)
    }()
}