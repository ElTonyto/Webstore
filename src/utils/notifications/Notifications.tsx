import { toast } from "react-toastify"

export const notification = (msg: string, type: "success" | "warning" | "info" | "error", timer?: number) => {
    toast(msg, {
        progressClassName: `progress-bar-${type}`,
        autoClose: timer
    })
}
