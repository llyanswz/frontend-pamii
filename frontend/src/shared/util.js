export function logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
    window.location.href = '/login';
}

export async function toast(mensagem, color = 'danger') {
    const toast = document.createElement('ion-toast');
    toast.message = mensagem;
    toast.color = color;
    toast.duration = 2000;
    toast.position = 'bottom';

    document.body.appendChild(toast);
    return toast.present();
}
