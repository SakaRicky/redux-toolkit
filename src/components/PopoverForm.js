import React from 'react';
import { useDisclosure } from '@chakra-ui/react'
import {
    ButtonGroup,
    FormControl,
    FormLabel,
    Input,
    Stack,
    IconButton,

  } from '@chakra-ui/react';
  import { Filter } from 'react-feather';
  import  FocusLock from "react-focus-lock";
  import { Button, Popover } from 'antd';

// 1. Create a text input component
const TextInput = React.forwardRef((props, ref) => {
    return (
      <FormControl>
        <FormLabel htmlFor={props.id}>{props.label}</FormLabel>
        <Input ref={ref} id={props.id} {...props} />
      </FormControl>
    )
  })
  
  // 2. Create the form
  const Form = ({ firstFieldRef, onCancel }) => {
    return (
      <Stack spacing={4}>
        <TextInput
          label='Post Status'
          id='first-name'
          ref={firstFieldRef}
          defaultValue='Draft'
        />
        <TextInput label='Post Type' id='last-name' defaultValue='Page' />
        <ButtonGroup display='flex' justifyContent='flex-end'>
          <Button type="primary">
            Filter
          </Button>
        </ButtonGroup>
      </Stack>
    )
  }


  
  // 3. Create the Popover
  // Ensure you set `closeOnBlur` prop to false so it doesn't close on outside click
  const PopoverForm = ({ icon }) => {

    const { onOpen, onClose, isOpen } = useDisclosure()
    const firstFieldRef = React.useRef(null)

    const popOverContent = (
      <div>
          <Form firstFieldRef={firstFieldRef} />
      </div>
    );
  
    return (
      <>

        <Popover placement="right" content={popOverContent} trigger="click">
          <IconButton size='sm' icon={
              icon? icon : <Filter size={16} />
            } />
        </Popover>

      </>
    )
  }
  
  export default PopoverForm;
//   render(<PopoverForm />)