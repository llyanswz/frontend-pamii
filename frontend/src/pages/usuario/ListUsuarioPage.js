import './ListUsuarioPage.css'
import { createHeader } from '../../shared/Header.js'
import { logout, toast } from '../../shared/util.js'; 
import { api } from '../../shared/api.js';

const pageName = 'Usuário';

class ListUsuarioPage extends HTMLElement {
    async connectedCallback() {
        this.classList.add('ion-page');
        const cabecalho = createHeader(pageName);
        this.innerHTML = `
            ${cabecalho}
            <ion-content>
                <div class="list-usuario">
                    <ion-spinner slot="fixed"></ion-spinner>
                </div>
            </ion-content>
        `;
        this.querySelector('#logout-btn')
        .addEventListener('click', logout);

        try {
            const usuarios = await api.get('/usuario');
            this.renderUsuarios(usuarios);
        } catch (error) {
            await toast(error.message || 'Erro ao carregar usuários');
            this.querySelector(".list-usuario").innerHTML = '<p>Erro ao carregar usuários</p>';
        }
    }

    renderUsuarios(usuarios) {
        const container = this.querySelector(".list-usuario");

        if (usuarios.length === 0) {
            container.innerHTML = '<p> Nenhum usuario encontrado </p>'
            return;
        }
        
        const usuarioItems = usuarios.map(usuario => `
            <ion-item>
                <ion-label>
                <h2 style="display: flex; align-items: center; gap: 8px;">
                    <ion-icon
                    name="${usuario.perfil == 0 ? 'restaurant' : 'person'}"
                    color="${usuario.perfil == 0 ? 'primary' : 'secondary'}"
                    style="flex-shrink: 0;"
                    ></ion-icon>
                    <span>${usuario.nome}</span>
                </h2>
                <p>${usuario.usuario}</p>
                </ion-label>

                <ion-buttons slot="end">
                <ion-button fill="clear" class="btn-edit" data-id="${usuario.id}">
                    <ion-icon slot="icon-only" name="create-outline"></ion-icon>
                </ion-button>
                <ion-button fill="clear" color="danger" class="btn-delete" data-id="${usuario.id}">
                    <ion-icon slot="icon-only" name="trash-outline"></ion-icon>
                </ion-button>
                </ion-buttons>
            </ion-item>
            `).join('');
    
        container.innerHTML = `<ion-list>${usuarioItems}</ion-list>`;

        // Eventos de editar e deletar
        this.querySelectorAll('.btn-edit').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = btn.dataset.id;
                document.querySelector('ion-router').push(`/usuario/edit?id=${id}`, 'forward');
            });
        });

        this.querySelectorAll('.btn-delete').forEach(btn => {
            btn.addEventListener('click', async () => {
                const id = btn.dataset.id;
                if (confirm('Tem certeza que deseja excluir este usuário?')) {
                    try {
                        await api.delete(`/usuario/${id}`);
                        await toast('Usuário excluído com sucesso!', 'success');
                        const usuariosAtualizados = await api.get('/usuario');
                        this.renderUsuarios(usuariosAtualizados);
                    } catch (error) {
                        await toast(error.message || 'Erro ao excluir usuário');
                    }
                }
            });
        });
    }
}

customElements.define('list-usuario-page', ListUsuarioPage);