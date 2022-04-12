import fetch from 'cross-fetch';

export function getCompare() {
	return fetch('http://localhost:3000/compare').then(response => response.json());
}