import { useToast } from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';

const $toast = useToast({
    position: 'top-right',
    dismissible: true,
    duration: 5000,
    queue:true
});

export default class Notify {
    static success(msg) {
        $toast.success(msg);
    }

    static error(msg) {
        $toast.error(msg);
    }
}