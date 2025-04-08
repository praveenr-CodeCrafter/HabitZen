import React, { useState } from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, FormControl, FormLabel } from '@chakra-ui/react';

function HabitModal({ onClose, onSave }) {
  const [habitTitle, setHabitTitle] = useState('');

  const handleSave = () => {
    onSave(habitTitle);
    setHabitTitle('');
  };

  return (
    <Modal isOpen={true} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add New Habit</ModalHeader>
        <ModalBody>
          <FormControl>
            <FormLabel>Habit Title</FormLabel>
            <Input 
              type="text" 
              value={habitTitle} 
              onChange={(e) => setHabitTitle(e.target.value)} 
              placeholder="Morning Workout" 
            />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            colorScheme="blue" 
            onClick={handleSave} 
            disabled={!habitTitle}
          >
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default HabitModal;
