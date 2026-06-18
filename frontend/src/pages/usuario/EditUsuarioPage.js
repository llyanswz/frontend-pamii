import './EditUsuarioPage.css'
import { createHeader } from '../../shared/Header.js'
import { logout, toast } from '../../shared/util.js';
import { api } from '../../shared/api.js';

const pageName = 'Editar Usuario';

class EditUsuarioPage extends HTMLElement {
    async connectedCallback() {
        this.classList.add('ion-page');
        const cabecalho = createHeader(pageName);
        this.innerHTML = `
            ${cabecalho}
            <ion-content class="ion-padding">
                <form id="form-usuario">
                <ion-list>
                    <ion-item>
                    <ion-input type="text" name="nome" label="Nome Completo" label-placement="floating" required></ion-input>
                    </ion-item>

                    <ion-item>
                    <ion-input type="text" name="usuario" label="Usuário" label-placement="floating" required></ion-input>
                    </ion-item>

                    <ion-item>
                    <ion-input type="password" name="senha" label="Senha" label-placement="floating" required></ion-input>
                    </ion-item>

                    <ion-item>
                    <ion-select name="perfil" label="Perfil" label-placement="floating">
                        <ion-select-option value="0">Administrador</ion-select-option>
                        <ion-select-option value="1">Atendente</ion-select-option>
                    </ion-select>
                    </ion-item>
                </ion-list>

                <div class="ion-padding">
                    <ion-button expand="block" type="submit" class="ion-margin-top">
                    <ion-icon name="checkmark-circle" slot="start" style="margin-right: 8px;"></ion-icon>
                    Salvar Usuário
                    </ion-button>
                    <ion-button expand="block" color="danger" id="btn-cancelar">
                    <ion-icon name="close-circle" slot="start" style="margin-right: 8px;"></ion-icon>
                    Cancelar
                    </ion-button>
                </div>
                </form>
            </ion-content>
        `;
        this.querySelector('#logout-btn')
        .addEventListener('click', logout);
        this.querySelector('#btn-cancelar').addEventListener('click', () => window.history.back());

        // Recuperar ID da URL
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get('id');

        if (!id) {
            await toast('ID do usuário não fornecido');
            window.history.back();
            return;
        }

        try {
            const usuario = await api.get(`/usuario/${id}`);
            this.populateForm(usuario);
        } catch (error) {
            await toast(error.message || 'Erro ao carregar dados do usuário');
            window.history.back();
        }

        const form = this.querySelector('#form-usuario');
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const formData = new FormData(form);
            const data = {
                nome: formData.get('nome'),
                usuario: formData.get('usuario'),
                senha: formData.get('senha'),
                perfil: parseInt(formData.get('perfil'))
            };

            try {
                await api.patch(`/usuario/${id}`, data);
                await toast('Usuário atualizado com sucesso!', 'success');
                document.querySelector('ion-router').push('/usuario/list', 'forward');
            } catch (error) {
                await toast(error.message || 'Erro ao atualizar usuário');
            }
        });
    }

    populateForm(usuario) {
        const form = this.querySelector('#form-usuario');
        form.querySelector('ion-input[name="nome"]').value = usuario.nome;
        form.querySelector('ion-input[name="usuario"]').value = usuario.usuario;
        form.querySelector('ion-input[name="senha"]').value = usuario.senha;
        form.querySelector('ion-select[name="perfil"]').value = usuario.perfil.toString();
    }
}

customElements.define('edit-usuario-page', EditUsuarioPage);