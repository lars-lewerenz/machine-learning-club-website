import { toast } from 'react-hot-toast';

function getCssVariable(name) {
    return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

export function showSuccessToast(message) {
    toast.success(message, {
        style: getStyle("success"),
    });
}

export function showWarningToast(message) {
    toast(message, {
        style: getStyle("warning"),
        icon: '⚠️'
    });
}

export function showErrorToast(message) {
    toast.error(message, {
        style: getStyle("error"),
    });
}

function getStyle(type) {
    let backgroundVar, foregroundVar;

    switch (type) {
        case 'success':
            backgroundVar = '--success';
            foregroundVar = '--success-foreground';
            break;
        case 'error':
            backgroundVar = '--destructive';
            foregroundVar = '--destructive-foreground';
            break;
        case 'warning':
            backgroundVar = '--warning';
            foregroundVar = '--warning-foreground';
            break;
        default:
            backgroundVar = '--secondary';
            foregroundVar = '--foreground';
    }

    const background = getCssVariable(backgroundVar) || '0 0% 100%';
    const color = getCssVariable(foregroundVar) || '222.2 84% 4.9%';

    return {
        background: `hsl(${background})`,
        color: `hsl(${color})`,
    };
}