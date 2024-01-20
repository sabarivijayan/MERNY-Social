import React, { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const EditProfileButton = () => {
  const [profile, setProfile] = useState({
    fullname: '',
    mobile: '',
    address: '',
    bio: '',
    website: '',
    gender: '',
  });

  const handleChange = (event) => {
    setProfile({
      ...profile,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Perform the save action with the updated profile details
    console.log('Updated profile details:', profile);
  };

  return (
    <Dropdown >
      <Dropdown.Toggle variant="primary" size="lg" style={{width: '300px', display: 'flex', justifyContent: 'center', alignItems: 'center', marginRight: '20px' ,backgroundColor:"#4ea8de"}}  >
      <span>Edit Profile</span>
      </Dropdown.Toggle>
      
      <Dropdown.Menu style={{width:"300px"}}>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formFullname">
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              type="text-box"
              name="fullname"
              value={profile.fullname}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formMobile">
            <Form.Label>Mobile</Form.Label>
            <Form.Control
              type="text-box"
              name="mobile"
              value={profile.mobile}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formAddress">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text-box"
              name="address"
              value={profile.address}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formBio">
            <Form.Label>Bio</Form.Label>
            <Form.Control
              as="textarea"
              name="bio"
              value={profile.bio}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formWebsite">
            <Form.Label>Website</Form.Label>
            <Form.Control
              type="text-box"
              name="website"
              value={profile.website}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formGender">
            <Form.Label>Gender</Form.Label>
            <Form.Control
              as="select"
              name="gender"
              value={profile.gender}
              onChange={handleChange}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </Form.Control>
          </Form.Group>
          <Button variant="secondary"  type="submit-box" style={{backgroundColor:"#0e9594" ,width:"300px"}}>
            Save
          </Button>
        </Form>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default EditProfileButton;
