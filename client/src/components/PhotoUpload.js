import React, { useState, useContext } from 'react';
import FormData from 'form-data';
import axios from 'axios';
import { Typography, CircularProgress, Dialog, DialogActions, Button, Container } from '@material-ui/core';
import AuthContext from '../state_management/AuthContext';

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
	const authContext = useContext(AuthContext);
	const [dialogOpen, setDialogOpen] = useState(false);
	const [errorMsg, setErrorMsg] = useState('');
	const [imageIsLoading, setImageIsLoading] = useState(false);
	const [formData, setFormData] = useState({
		image: ''
	});
	const [uploadedImageUrl, setUploadedImageUrl] = useState(null);
	const [newImgLoaded, setNewImgLoaded] = useState(false);

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
			await setUploadedImageUrl(res.data.imageUrl);
			await setImageIsLoading(false);
			await setNewImgLoaded(true);
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
	};
	const setProfilePicture = async (url) => {
		try {
			const config = {
				headers: {
					'Content-Type': 'application/json'
				}
			};
			const body = { url };
			const res = await axios.post(`/users/updateProfilePicture`, body, config);
			await setDialogOpen(false);
			await setNewImgLoaded(false);
			await authContext.handleNewProfilePicture(url);
			await setUploadedImageUrl(null);
			console.log(res);
			return res;
		} catch (err) {
			setErrorMsg('Error Setting New Profile Img');
			setTimeout(() => {
				setErrorMsg('');
			}, 4000);
		}
	};
	return (
		<div>
			<Button onClick={() => setDialogOpen(true)} {...props}>
				Profile Photo Upload
			</Button>
			<Dialog style={style.dialog} open={dialogOpen}>
				<Container style={{ width: '95%' }}>
					<form encType="multipart/form-data" style={style.formStyle}>
						<Typography style={style.header} component="h3" align="center" color="textPrimary" gutterBottom>
							Upload Profile Picture
						</Typography>
						{imageIsLoading ? (
							<CircularProgress style={style.imgPreview} color="secondary" />
						) : authContext ? (
							<img
								src={newImgLoaded ? uploadedImageUrl : authContext.profile_picture}
								style={style.noProfileImg}
								alt="uploaded image preview"
							/>
						) : (
							<CircularProgress style={style.imgPreview} color="secondary" />
						)}
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
						onClick={() => setProfilePicture(uploadedImageUrl)}
						color="primary"
						fullWidth
						variant="contained"
					>
						Save Profile Picture
					</Button>
				</Container>
			</Dialog>
		</div>
	);
}
