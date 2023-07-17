/* 控制loading状态的自动切换hook */
export function useAutoRequest(fun: any, options?: any) {
  const { loading = false, onSuccess } = options || { loading: false }

  const requestLoading = ref(loading)

  const run = (...params: any[]) => {
    requestLoading.value = true
    return fun(...params)
      .then((res: any) => {
        onSuccess && onSuccess(res)
        return res
      })
      .finally(() => {
        requestLoading.value = false
      })
  }

  return [requestLoading, run]
}
