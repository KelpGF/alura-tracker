import { INotificacao } from '@/interfaces/INotificacao';
import { store } from '@/store';
import { NOTIFICAR } from '@/store/tipos-mutacaoes';

type Notificador = {
	notificar: (notificacao: INotificacao) => void;
};

export default (): Notificador => {
	const notificar = (notificacao: INotificacao): void => {
		store.commit(NOTIFICAR, notificacao);
	};

	return {
		notificar,
	};
};
