import fetch from 'cross-fetch';

export function getData() {
	return fetch('http://localhost:3000/movies').then(response => response.json());
}