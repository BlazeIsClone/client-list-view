import { instance } from '@services';
import axios from 'axios';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Inputs, LoginErrRes } from './OptionsBar.types';

export const OptionsBar = () => {
	const create = (e: any) => {
		e.preventDefault();
	};

	const {
		register,
		setError,
		handleSubmit,
		formState: { errors },
	} = useForm<Inputs>();

	const onSubmit: SubmitHandler<Inputs> = async data => {
		try {
			await instance.post(`/clients`);
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div>
			<hr />
			<form onSubmit={handleSubmit(onSubmit)}>
				<input
					placeholder={'sam@fisher.com'}
					type={'email'}
					{...register('email', { required: true })}
				/>
				<input
					placeholder={'john'}
					type={'first_name'}
					{...register('first_name', { required: true })}
				/>

				<input type={'submit'} value={'Create'} />
			</form>
			<hr />
			<br />
			<br />
		</div>
	);
};
