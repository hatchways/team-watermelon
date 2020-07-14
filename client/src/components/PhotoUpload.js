import React, { useState, useContext, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import FormData from 'form-data';
import axios from 'axios';
import { Typography } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import AuthContext from '../state_management/AuthContext';

const loadingImage = 'https://team-watermelon-bigdeal-images.s3.amazonaws.com/1594749857168';
const style = {
	error: {
		color: 'red'
	},
	dialog: {
		padding: '10px 50px',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center'
	},
	appBar: {
		marginBottom: '30px'
	},
	formStyle: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		marginBottom: '30px',
		width: '100%'
	},
	hidden: {
		visibility: 'hidden'
	},
	textField: {
		width: '70%'
	},
	noProfileImg: {
		backgroundColor: 'grey',
		border: '1px transparent',
		borderRadius: '50%',
		width: '220px',
		height: '220px',
		marginTop: '20px'
	},
	imgPreview: {
		width: '100%',
		height: '100%',
		overflow: 'hidden',
		border: '1px solid white',
		position: 'relative',
		zIndex: '2',
		borderRadius: '50%'
	},
	header: {
		margin: '10px'
	}
};

export default function PhotoUpload(props) {
	const [dialogOpen, setDialogOpen] = useState(false);
	const [errorMsg, setErrorMsg] = useState('');
	const [imageIsLoading, setImageIsLoading] = useState(false);
	const [formData, setFormData] = useState({
		image: ''
	});
	const [uploadedImageUrl, setUploadedImageUrl] = useState(null);
	const { image } = formData;
	const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.files[0] });

	const uploadImage = async (image) => {
		var formData = new FormData();
		formData.append('image', image);
		try {
			await setImageIsLoading(true);
			const res = await axios.post(`/upload/image-upload`, formData, {
				headers: {
					'Content-Type': `multipart/form-data`
				}
			});
			await res;
			await setUploadedImageUrl(res.data.imageUrl);
			await setImageIsLoading(false);
			return res;
		} catch (err) {
			setErrorMsg('Error uploading file');
			setTimeout(() => {
				setErrorMsg('');
			}, 4000);
		}
		return null;
	};
	const onSubmitForm = (e) => {
		e.preventDefault();
		uploadImage(image);
		console.log('Form Submitted');
	};

	return (
		<div>
			<Button onClick={() => setDialogOpen(true)} {...props}>
				Profile Photo Upload
			</Button>
			<Dialog style={style.dialog} open={dialogOpen}>
				<form enctype="multipart/form-data" style={style.formStyle}>
					<Typography
						style={style.header}
						component="h2"
						variant="h4"
						align="center"
						color="textPrimary"
						gutterBottom
					>
						Upload Profile Picture
					</Typography>
					<div style={style.noProfileImg}>
						<img style={style.imgPreview} src={imageIsLoading ? loadingImage : uploadedImageUrl} />
					</div>
					<p style={style.error}>{errorMsg}</p>
					<input onChange={onChange} name="image" type="file" />
				</form>
				<DialogActions>
					<Button fullWidth onClick={onSubmitForm} variant="contained" color="primary">
						Upload
					</Button>
					<Button fullWidth onClick={() => setDialogOpen(false)} color="primary">
						Cancel
					</Button>
				</DialogActions>
				<Button
					style={uploadedImageUrl ? { display: 'flex', marginBottom: '10px' } : { display: 'none' }}
					onClick={() => setDialogOpen(false)}
					color="primary"
					fullWidth
					variant="contained"
				>
					Save Profile Picture
				</Button>
			</Dialog>
		</div>
	);
}
