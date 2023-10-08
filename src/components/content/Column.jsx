

import { useNavigation } from "@react-navigation/native";
import React, { useContext, useState } from "react";
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Image, TextInput, Modal, TouchableWithoutFeedback } from "react-native";
import AppContext from "../../context/index";
import * as ImagePicker from "expo-image-picker";
import { app } from '../../api/firebase'

import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const storage = getStorage(app);

export default ({ currentBoard, column }) => {
	const { setCurrentTask, setCurrentColumn } = useContext(AppContext);
	const [columnName, setColumnName] = useState(column.name);
	const [isEditingColumnName, setIsEditingColumnName] = useState(false);
	const [inputCreateCard, setInputCreateCard] = useState(false);
	const [modalVisible, setModalVisible] = useState(false);
	const [cardName, setCardName] = useState("");
	const navigation = useNavigation();

	const openModal = () => {
		setModalVisible(!modalVisible);
	};

	async function askPermission() {
		const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
		if (status !== "granted") {
			console.log("La permission d'accès à la galerie a été refusée.");
		} else {
			pickImage();
		}
	}

	async function pickImage() {
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
		});

		if (!result.cancelled) {
			const uri = result.assets[0].uri;
			const response = await fetch(uri);
			const tmp_blob = await response.blob();
			uploadImageToFirebaseStorage(tmp_blob);
		}
	}

	async function uploadImageToFirebaseStorage(blob) {
		try {
			// Génère un nom de fichier unique pour l'image.
			const imageName = `${currentBoard.id}__${new Date().getTime()}.jpg`;

			// Référence de stockage Firebase pour le nouvel emplacement de l'image.
			const storageRef = ref(storage, `images/${imageName}`);

			// Envoie le blob vers Firebase Storage.
			await uploadBytes(storageRef, blob);

			// Obtient l'URL de téléchargement de l'image.
			const downloadURL = await getDownloadURL(storageRef);
			console.log("Image téléchargée avec succès. URL de téléchargement :", downloadURL);
			currentBoard.createTask(imageName, "", column, downloadURL);

			// Vous pouvez utiliser cette URL pour afficher l'image dans votre application ou la stocker dans une base de données Firebase si nécessaire.
		} catch (error) {
			console.error(`Erreur lors de l'envoi de l'image sur Firebase Storage :`, error);
		}
	}

	function createCard() {
		if (inputCreateCard) {
			currentBoard.createTask(cardName, "", column, "");
			setCardName("");
			setInputCreateCard(false);
		} else {
			setInputCreateCard(true);
		}
	}

	function handelPress(task) {
		setCurrentTask(task);
		setCurrentColumn(column);
		navigation.navigate("modifTask");
	}
	function delcol() {
		currentBoard.deleteColumn(column)
		openModal()
	}

	function handleEditColumnName() {
		if (isEditingColumnName) {
			// Mettez ici la logique pour enregistrer le nouveau nom du tableau.
			column.name = columnName;
			currentBoard.save()
		}
		setIsEditingColumnName(!isEditingColumnName);
	}

	return (
		<View>
			<ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
				<View style={styles.containerCard}>
					<View style={styles.headerCollum}>
						<TouchableOpacity onPress={handleEditColumnName}>
							{isEditingColumnName ? (
								<View style={styles.containerEditColumnName}>
									<TextInput
										style={styles.input}
										placeholder="Nom de la column"
										value={columnName}
										onChangeText={(text) => setColumnName(text)}
										autoFocus
										onBlur={handleEditColumnName}
										onSubmitEditing={handleEditColumnName}
									/>
									<Image style={styles.imageSend} source={require("../../assets/imgs/ValidateBlue.png")} />
								</View>
							) : (
								<Text style={styles.text}>{column.name}</Text>
							)}
						</TouchableOpacity>
						<TouchableOpacity key={column.id} onPress={openModal}>
							<Image source={require("../../assets/imgs/BurgerMenu.png")} />
						</TouchableOpacity>
					</View>

					{column
						? column.tasks.map((task, index) => (
							<TouchableOpacity key={index} onPress={() => handelPress(task)}>
								<View style={styles.containerCards}>

									{task.imgBlob && (
										<Image
											source={{ uri: task.imgBlob }}
											style={{ height: 200 }}
										/>
									)}
									<Text style={styles.textCardDescription}>{task.name}</Text>
								</View>
							</TouchableOpacity>
						))
						: null}

					<View style={styles.containerAddCardAndImage}>
						<TouchableOpacity onPress={createCard}>
							{inputCreateCard ? (
								<View style={styles.containerAddCard}>
									<TextInput
										style={styles.input}
										placeholder="Nom de la carte"
										value={cardName}
										onChangeText={(text) => setCardName(text)}
										autoFocus
										onBlur={createCard}
										onSubmitEditing={createCard}
									/>
									<Image style={styles.imageSend} source={require("../../assets/imgs/ValidateBlue.png")} />
								</View>
							) : (

								<Text style={styles.addCardText}>Ajouter une carte</Text>
							)}
						</TouchableOpacity>

						<TouchableOpacity onPress={askPermission}>
							<Image source={require("../../assets/imgs/AddImage.png")} />
						</TouchableOpacity>
					</View>
				</View>
			</ScrollView>
			{modalVisible ? (
				<View style={styles.modaleContainer}>
					<View style={styles.modalStyle}>
						<Text style={styles.modalText}>Déplacer {column.name}</Text>
						<Text onPress={delcol} style={styles.modalText}>Supprimer {column.name}</Text>
						<TouchableOpacity onPress={openModal}>
							<Text style={styles.modalText}>Fermer la modale</Text>
						</TouchableOpacity>
					</View>
				</View>
			) : null}
		</View>
	);
};

const styles = StyleSheet.create({
	scrollView: {
		flex: 1,
	},
	containerEditColumnName: {
		flexDirection: "row",
		alignItems: "center"
	  },
	containerCard: {
		width: 330,
		padding: 16,
		marginLeft: 25,
		marginRight: 16,
		backgroundColor: "#000000",
		borderRadius: 8,
	},
	headerCollum: {
		marginTop: 8,
		marginBottom: 16,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	text: {
		color: "#fcfcfc",
		fontSize: 16,
		fontWeight: "800",
	},
	containerCards: {
		backgroundColor: "#171b1e",
		width: "100%",
		marginBottom: 16,
		borderRadius: 4,
		padding: 8,
	},
	textCardDescription: {
		color: "#fcfcfc",
	},
	containerAddCardAndImage: {
		flexDirection: "row",
		justifyContent: "space-between",
	},
	addCardText: {
		color: "#699dff",
		fontWeight: "500",
		fontSize: 16,
	},
	containerAddCard: {
		flexDirection: "row",
		alignItems: "center",
	},
	input: {
		width: "80%",
		fontSize: 16,
		borderColor: "#699dff",
		borderBottomWidth: 2,
		color: "#fcfcfc",
	},
	imageSend: {
		width: 15,
		height: 15,
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
});
