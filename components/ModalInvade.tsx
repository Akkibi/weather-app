import React from "react";
import {
  View,
  StyleSheet,
  Text,
  Modal,
  TouchableOpacity,
} from "react-native";
import ModalSvg from "./svg/modalSvg";
import BtnBg from "./svg/BtnBg";
import ModalBg from "./svg/ModalBg";

interface ModalProps {
  isInvasionModalVisible: boolean;
  setIsInvasionModalVisible: (isInvasionModalVisible: boolean) => void
}

export default function ModalInvade({ isInvasionModalVisible, setIsInvasionModalVisible } : ModalProps) {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isInvasionModalVisible}
      onRequestClose={() => setIsInvasionModalVisible(false)}
    >
      <View style={styles.modalContainer}>
        <ModalBg />
        <View style={styles.modalContent}>
          <View style={styles.modalHeadContent}>
            <ModalSvg width={24} height={24}/>
          </View>

          <View style={styles.modalMainContent}>
            <Text style={styles.modalMainText}>Bouleversement politique en cours sur la planète Ell. Voulez-vous accéder aux informations ?</Text>
            <Text style={styles.modalText}>Rappel : {"\n"}Distance : 1789Au {"\n"}Taux de pilosité : 120 poils/cm2_ 33 poils/cm2 {"\n"}Faiblesse : Chats</Text>
          </View>
          <View style={styles.modalActions}>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setIsInvasionModalVisible(false)}
            >
              <BtnBg />
              <Text style={styles.modalButtonText}>Rejoindre</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setIsInvasionModalVisible(false)}
            >
              <BtnBg />
              <Text style={[styles.modalButtonText, {paddingHorizontal: 43}]}>Non</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}


const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
    padding: 32,
  },
  modalContent: {
    display: 'flex',
    gap: 32,
    backgroundColor: 'rgba(0, 0, 0, 0)',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
  },
  modalHeadContent: {
    display: 'flex',
    alignSelf: 'flex-start',
  },
  modalMainContent: {
    display: 'flex',
    gap: 20,
  },
  modalActions: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'flex-start',
    width: '100%'
  },
  modalText: {
    color: 'white',
    fontFamily: 'ClashDisplay',
    fontSize: 18,
    lineHeight: 20
  },
  modalMainText: {
    color: 'white',
    fontFamily: 'ClashDisplayBold',
    fontWeight: 'bold',
    fontSize: 18,
    lineHeight: 22
  },
  modalButton: {
    position: 'relative',
    width: "auto",
    height: "auto",
    justifyContent: "center",
    alignItems: "center",
  },
  modalButtonText: {
    zIndex: 1,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    paddingHorizontal: 25,
  },
});
