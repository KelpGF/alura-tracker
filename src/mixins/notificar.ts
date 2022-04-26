import { INotificacao } from '@/interfaces/INotificacao';
import { store } from '@/store';
import { NOTIFICAR } from '@/store/tipos-mutacaoes';

export const notificacaoMixin = {
	methods: {
		notificar(notificacao: INotificacao) {
			store.commit(NOTIFICAR, notificacao);
		},
	},
};
