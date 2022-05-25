import { React, useEffect, useState } from 'react';
import { GET_LOGIN_API } from '../../config';
import { useNavigate } from 'react-router-dom';
import qs from 'qs';

const Login = () => {
	const navigate = useNavigate();
	const [kakaoToken, setKakaoToken] = useState('');
	let params = new URLSearchParams(document.location.search);
	const code = params.get('code');

	useEffect(() => {
		fetch('https://kauth.kakao.com/oauth/token', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
			},
			body: qs.stringify({
				grant_type: 'authorization_code',
				client_id: `${process.env.REACT_APP_KAKAO_REST_API_KEY}`,
				redirect_uri: `${process.env.REACT_APP_KAKAO_REDIRECT_URL}`,
				code: code,
			}),
		})
			.then(res => res.json())
			.then(data => {
				setKakaoToken(data.access_token);
			});
	}, [code]);

	useEffect(() => {
		if (kakaoToken) {
			fetch(`${GET_LOGIN_API}`, {
				method: 'GET',
				headers: { Authorization: kakaoToken },
			})
				.then(res => res.json())
				.then(data => sessionStorage.setItem('access_token', data.ourToken))
				.then(navigate('/'));
		}
	}, [kakaoToken, navigate]);

	return <div>Token successfully received</div>;
};

export default Login;
