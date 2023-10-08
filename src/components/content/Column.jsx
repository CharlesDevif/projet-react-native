import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Image, TextInput, Modal } from "react-native";
import AppContext from "../../context/index";
import * as ImagePicker from "expo-image-picker";
import { app } from "../../api/firebase";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { PanGestureHandler, State } from "react-native-gesture-handler"; // Import de PanGestureHandler
import { useNavigation } from "@react-navigation/core";
import { Animated, PanResponder } from "react-native";

const storage = getStorage(app);

export default ({ currentBoard, column, indexOfColumn }) => {
	const { setCurrentTask, setCurrentColumn } = useContext(AppContext);
	const [columnName, setColumnName] = useState(column.name);
	const [cardAnimations, setCardAnimations] = useState(column.tasks.map(() => new Animated.Value(0)));
	const [isEditingColumnName, setIsEditingColumnName] = useState(false);
	const [inputCreateCard, setInputCreateCard] = useState(false);
	const [modalVisible, setModalVisible] = useState(false);
	const [cardName, setCardName] = useState("");
	const navigation = useNavigation();
	const [isSwiping, setIsSwiping] = useState(false);
	const [cardOpacities, setCardOpacities] = useState(column.tasks.map(() => new Animated.Value(1))); // Initialisation des opacités

	useEffect(() => {
		// Mettez à jour les animations lorsque la liste de tâches change
		setCardAnimations(column.tasks.map(() => new Animated.Value(0)));
		setCardOpacities(column.tasks.map(() => new Animated.Value(1))); // Initialisation des opacités
	}, [column.tasks]);

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
			const newTask = currentBoard.createTask(cardName, "", column, "");
			setCardName("");
			setInputCreateCard(false);

			// Ajoutez une nouvelle valeur à cardAnimations pour la nouvelle carte
			setCardAnimations([...cardAnimations, new Animated.Value(0)]);
		} else {
			setInputCreateCard(true);
		}
	}

	function handelPress(task) {
		setCurrentTask(task);
		setCurrentColumn(column);
		navigation.navigate("modifTask");
	}

	function handleCardSwipe(index, gestureState) {
		// ... autre logique de glissement
		if (gestureState.dx > 20) {
			// Glissé vers la droite
			const nextColumnIndex = indexOfColumn + 1;
			if (nextColumnIndex < currentBoard.columns.length) {
				// Vérifiez si la colonne suivante existe
				const nextColumn = currentBoard.columns[nextColumnIndex];
				console.log(nextColumn);
				// Déplacez la tâche vers la colonne suivante
				nextColumn.tasks.push(column.tasks[index]);
				setCardAnimations([...cardAnimations, new Animated.Value(0)]);
				column.tasks.splice(index, 1);
				currentBoard.save(); // Assurez-vous de sauvegarder les modifications

				// Mettez à jour cardAnimations pour refléter les changements
				const updatedAnimations = [...cardAnimations];
				updatedAnimations.splice(index, 1); // Supprimez l'animation de la carte supprimée
				setCardAnimations(updatedAnimations);
			}
		} else if (gestureState.dx < -20) {
			// Glissé vers la gauche
			const prevColumnIndex = indexOfColumn - 1;
			if (prevColumnIndex >= 0) {
				// Vérifiez si la colonne précédente existe
				const prevColumn = currentBoard.columns[prevColumnIndex];
				// Déplacez la tâche vers la colonne précédente
				prevColumn.tasks.push(column.tasks[index]);
				console.log("test");
				setCardAnimations([...cardAnimations, new Animated.Value(0)]);
				column.tasks.splice(index, 1);
				currentBoard.save(); // Assurez-vous de sauvegarder les modifications

				// Mettez à jour cardAnimations pour refléter les changements
				const updatedAnimations = [...cardAnimations];
				updatedAnimations.splice(index, 1); // Supprimez l'animation de la carte supprimée
				setCardAnimations(updatedAnimations);
			}
		} else {
			// Réinitialisez la carte à sa position initiale
			Animated.spring(cardAnimations[index], {
				toValue: 0,
				useNativeDriver: false,
			}).start();
		}
	}

	function delcol() {
		currentBoard.deleteColumn(column);
		openModal();
	}

	function handleEditColumnName() {
		if (isEditingColumnName) {
			// Mettez ici la logique pour enregistrer le nouveau nom du tableau.
			column.name = columnName;
			currentBoard.save();
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
						? column.tasks.map((task, index) => {
								const panResponder = PanResponder.create({
									onStartShouldSetPanResponder: () => true,
									onMoveShouldSetPanResponder: () => !isSwiping,
									onPanResponderMove: Animated.event([null, { dx: cardAnimations[index] }], { useNativeDriver: false }),
									onPanResponderRelease: (e, gestureState) => {
										handleCardSwipe(index, gestureState);
									},
								});

								let cardStyle; // Déplacez la déclaration ici

								if (index >= 0 && index < cardAnimations.length) {
									cardStyle = {
										transform: [{ translateX: cardAnimations[index] }],
										opacity: cardAnimations[index].interpolate({
											inputRange: [0, 100],
											outputRange: [1, 0.5],
										}),
									};
								}

								return (
									<Animated.View key={index} {...panResponder.panHandlers} style={[styles.containerCards, cardStyle]}>
										<TouchableOpacity
											onPress={() => {
												if (!isSwiping) {
													handelPress(task);
												}
											}}
										>
											{task.imgBlob && <Image source={{ uri: task.imgBlob }} style={{ height: 200 }} />}
											<Text style={styles.textCardDescription}>{task.name}</Text>
										</TouchableOpacity>
									</Animated.View>
								);
						  })
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
						<Text onPress={delcol} style={styles.modalText}>
							Supprimer {column.name}
						</Text>
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
		alignItems: "center",
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
