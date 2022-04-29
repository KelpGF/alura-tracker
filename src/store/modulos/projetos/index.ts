import IProjeto from '@/interfaces/IProjeto';
import { Estado } from '@/store';
import { ADD_PROJETO, DEFINIR_PROJETO, EDITAR_PROJETO, EXCLUIR_PROJETO } from '@/store/tipos-mutacaoes';
import { Module } from 'vuex';
import { ATUALIZAR_PROJETO, CADASTRAR_PROJETO, OBTER_PROJETOS, REMOVER_PROJETO } from './../../tipos-acoes';
import http from '@/http';

export interface EstadoProjeto {
	projetos: IProjeto[];
}

export const projeto: Module<EstadoProjeto, Estado> = {
	mutations: {
		[DEFINIR_PROJETO](state, projetos: IProjeto[]) {
			state.projetos = projetos;
		},
		[ADD_PROJETO](state, nome: string) {
			const projeto: IProjeto = {
				nome,
				id: new Date().toISOString(),
			};

			state.projetos.push(projeto);
		},
		[EDITAR_PROJETO](state, projeto: IProjeto) {
			const idx = state.projetos.findIndex((p) => p.id == projeto.id);

			state.projetos[idx] = projeto;
		},
		[EXCLUIR_PROJETO](state, id: string) {
			state.projetos = state.projetos.filter((p) => p.id !== id);
		},
	},
	actions: {
		[OBTER_PROJETOS]({ commit }) {
			http.get('projetos').then(({ data }) => {
				commit(DEFINIR_PROJETO, data);
			});
		},
		[CADASTRAR_PROJETO](contexto, nomeProjeto: string) {
			return http.post('/projetos', { nome: nomeProjeto });
		},
		[ATUALIZAR_PROJETO](contexto, projeto: IProjeto) {
			return http.put(`/projetos/${projeto.id}`, projeto);
		},
		[REMOVER_PROJETO](contexto, id: string) {
			return http.delete(`/projetos/${id}`);
		},
	},
};
