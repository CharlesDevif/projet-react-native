import React, { useContext, useState } from "react"
import { Image, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View, Modal, TouchableOpacity } from "react-native"
import AppContext from "../../context/index"
import { useNavigation } from "@react-navigation/native"
import { app } from "../../api/firebase"
import * as ImagePicker from "expo-image-picker"
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage"

const storage = getStorage(app)

export default () => {
	const { currentBoard, currentTask, currentColumn, setCurrentTask } = useContext(AppContext)
	const [modalVisible, setModalVisible] = useState(false)
	const [isEditing, setIsEditing] = useState(false)
	const [editedText, setEditedText] = useState(currentTask.name)
	const navigation = useNavigation()

	function updateName() {
		setIsEditing(false)
		currentTask.name = editedText
		currentBoard.save()
	}

	function delTask() {
		currentBoard.deleteTask(currentColumn, currentTask)
		navigation.goBack()
	}

	async function askPermission() {
		const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
		if (status !== "granted") {
			Alert.alert(`La permission d'accès à la galerie a été refusée.`)
		} else {
			pickImage()
		}
	}

	async function pickImage() {
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
		})

		if (!result.cancelled) {
			const uri = result.assets[0].uri
			const response = await fetch(uri)
			const tmp_blob = await response.blob()
			uploadImageToFirebaseStorage(tmp_blob)
		}
	}

	async function uploadImageToFirebaseStorage(blob) {
		try {
			const imageName = `${currentBoard.id}__${new Date().getTime()}.jpg`
			const storageRef = ref(storage, `images/${imageName}`)
			await uploadBytes(storageRef, blob)

			const downloadURL = await getDownloadURL(storageRef)
			currentTask.imgBlob = downloadURL
			currentBoard.save()
		} catch (error) {
			Alert.alert(`Erreur lors de l'envoi de l'image sur Firebase Storage :`, error)
		}
	}

	const BackgroundImage = () => {
		return currentTask.imgBlob
			? <Image source={{ uri: currentTask.imgBlob }} resizeMode="cover" style={styles.backgroundImage} />
			: <View style={{ backgroundColor: 'black' }} />
	}

	return (
		<View style={[styles.containerImageBackground, { backgroundColor: currentTask.imgBlob ? "transparent" : "black" }]}>
			<BackgroundImage />

			<View style={styles.contentContainer}>
				<View style={styles.headerMenu}>
					<Text onPress={() => navigation.goBack()} style={[styles.Text, styles.textSize, styles.zoneClic]}>
						X
					</Text>
					<TouchableOpacity style={styles.zoneClic} onPress={() => setModalVisible(!modalVisible)}>
						<Image source={require("../../assets/imgs/BurgerMenu.png")} />
					</TouchableOpacity>
				</View>
				<TouchableOpacity onPress={askPermission} style={styles.AddBackground}>
					<Image source={require("../../assets/imgs/AddImage.png")} />
					<Text style={[styles.Text, styles.textSize]}>Couverture</Text>
				</TouchableOpacity>
			</View>

			<TouchableWithoutFeedback
				onPress={() => {
					if (isEditing) {
						setIsEditing(false)
						updateName()
					}
				}}
			>
				<View style={styles.containerEditText}>
					<View style={styles.editTextName}>
						{isEditing ? (
							<TextInput style={styles.editTextInput} value={editedText} onChangeText={(text) => setEditedText(text)} multiline={true} autoFocus />
						) : (
							<TouchableWithoutFeedback
								onPress={() => setIsEditing(true)}
								onBlur={() => {
									if (isEditing) {
										setIsEditing(false)
										updateName()
									}
								}}
							>
								<Text style={[styles.taskText, styles.Text]}>{editedText}</Text>
							</TouchableWithoutFeedback>
						)}

						<View style={styles.containerEmplacement}>
							<Text style={[styles.Text, styles.TextBold, styles.textSize]}>{currentBoard.name} </Text>
							<Text style={[styles.Text, styles.textSize]}> dans la colonne </Text>
							<Text style={[styles.Text, styles.TextBold, styles.textSize]}> {currentColumn.name} </Text>
						</View>
					</View>
				</View>
			</TouchableWithoutFeedback>

			{modalVisible ? (
				<View style={styles.modaleContainer}>
					<View style={styles.modalStyle}>
						<Text onPress={delTask} style={styles.modalText}>
							Supprimer la tâche
						</Text>
						<TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
							<Text style={styles.modalText}>Fermer la modale</Text>
						</TouchableOpacity>
					</View>
				</View>
			) : null}
		</View>
	)
}

const styles = StyleSheet.create({
	containerImageBackground: {
		height: "100%",
		width: "100%",
	},

	zoneClic: {
		padding: 8,
	},

	backgroundImage: {
		position: "absolute",
		top: 0,
		left: 0,
		width: "100%",
		height:'100%'
		
	},
	contentContainer: {
		flex: 1,
		flexDirection: "column",
		justifyContent: "space-between",
	},
	headerMenu: {
		padding: 16,
		alignItems: "center",
		flexDirection: "row",
		justifyContent: "space-between",
		zIndex: 1,
	},
	AddBackground: {
		padding: 8,
		margin: 8,
		width: 130,
		backgroundColor: "#171b1e",
		alignItems: "center",
		justifyContent: "space-between",
		flexDirection: "row",
		borderRadius: 8,
		borderWidth: 1,
		borderColor: "#171b1e",
		zIndex: 1,
	},
	containerEditText: {
		backgroundColor: "#171b1e",
		flex: 1,
	},
	editTextName: {
		width: "90%",
		flex: 1,
	},
	editTextInput: {
		fontSize: 30,
		color: "#fcfcfc",
		padding: 22,
	},
	taskText: {
		padding: 22,
		fontSize: 30,
	},
	containerEmplacement: {
		paddingLeft: 22,
		flexDirection: "row",
	},
	TextBold: {
		fontWeight: "700",
		fontStyle: "italic",
	},
	textSize: {
		fontSize: 17,
	},
	Text: {
		color: "#fcfcfc",
	},
	modaleContainer: {
		position: "absolute",
		right: 0,
		width: "100%",
		padding: 2,
		justifyContent: "center",
		alignItems: "center",
		zIndex: 1,
	},
	modalStyle: {
		backgroundColor: "#171b1e",
		width: "80%",
		justifyContent: "space-around",
		padding: 16,
	},
	modalText: {
		fontSize: 16,
		marginBottom: 32,
		color: "#fcfcfc",
	},
})
