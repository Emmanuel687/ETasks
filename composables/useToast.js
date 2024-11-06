import { useToast } from 'vue-toastification'

export const useCustomToast = () => {
  const toast = useToast()

  return {
    success(message) {
      toast.success(message)
    },
    error(message) {
      toast.error(message)
    },
    info(message) {
      toast.info(message)
    },
    warning(message) {
      toast.warning(message)
    }
  }
}