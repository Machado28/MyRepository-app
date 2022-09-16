/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-unused-class-component-methods */
/* eslint-disable no-unused-expressions */
/* eslint-disable class-methods-use-this */
/* eslint-disable react/no-unused-state */
/* eslint-disable react/state-in-constructor */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FaGithubAlt, FaPlus, FaSpinner } from 'react-icons/fa';
import { Form, SubmitButton, List } from './styled';
import api from '../../services/api';
import Container from '../../components/Container';

export default class Main extends Component {
	state = {
		newRepo: '',
		repositories: [],
		loading: false,
	};

	componentDidMount() {
		const repositories = localStorage.getItem('repositories');

		if (repositories) {
			this.setState({ repositories: JSON.parse(repositories) });
		}
	}

	componentDidUpdate(_, prevState) {
		const { repositories } = this.state;

		if (prevState.repositories !== this.state.repositories) {
			localStorage.setItem('repositories', JSON.stringify(repositories));
		}
	}

	handleInputChange = (e) => {
		this.setState({ newRepo: e.target.value });
	};

	handleSubmit = async (e) => {
		e.preventDefault();
		const { newRepo, repositories } = this.state;

		this.setState({ loading: true });

		const response = await api.get(`/repos/${newRepo}`);
		console.log(response.data);

		const data = {
			name: response.data.full_name,
		};

		this.setState({
			repositories: [...repositories, data],
			newRepo: '',
			loading: false,
		});
	};

	render() {
		const { newRepo, loading, repositories } = this.state;
		return (
			<Container>
				<FaGithubAlt />
				<h1>Repositorios</h1>
				<Form onSubmit={this.handleSubmit}>
					<input
						type="text"
						value={newRepo}
						onChange={this.handleInputChange}
						placeholder="Adicionar repositorio"
					/>
					<SubmitButton type="submit" loading={loading}>
						{loading ? (
							<FaSpinner color="#fff" size={14} />
						) : (
							<FaPlus color="#fff" size={14} />
						)}
					</SubmitButton>
				</Form>
				<List>
					{repositories.map((repository) => (
						<li key={repository.name}>
							<span>{repository.name}</span>
							<Link to={`/repository/${encodeURIComponent(repository.name)}`}>
								Detalhes
							</Link>
						</li>
					))}
				</List>
			</Container>
		);
	}
}
