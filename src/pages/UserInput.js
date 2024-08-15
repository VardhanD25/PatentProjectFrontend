import React, { useState, useEffect } from 'react';
import FirstEntry from '../components/FirstEntry'; // Adjust the import path as needed
import SecondEntry from '../components/SecondEntry'; // Import SecondEntry component
import SinglePieceEntry from '../components/SinglePieceEntry'; // Import ThirdEntry component
import LotEntry from '../components/LotEntry'
import Navbar from '../components/Navbar';
function UserInput() {
  
  const [partCodes, setPartCodes] = useState([]);
  const [selectedPartCode, setSelectedPartCode] = useState('');
  const [partName, setPartName] = useState('');
  const [userId, setUserId] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]); // Default to today's date
  const [singleOrLot, setSingleOrLot] = useState('');
  const [densityType, setDensityType] = useState('');
  const [theoreticalDensity, setTheoreticalDensity] = useState('');
  const [attachmentExists, setAttachmentExists] = useState('');
  const [masterExists, setMasterExists] = useState('');
  const [masterAttachmentExists, setMasterAttachmentExists] = useState('');
  const [currentScreen, setCurrentScreen] = useState('first');
  const [attachmentMassAir, setAttachmentMassAir] = useState(0);
  const [attachmentMassFluid, setAttachmentMassFluid] = useState(0);
  const [masterSampleMassAir, setMasterSampleMassAir] = useState('');
  const [masterSampleMassFluid, setMasterSampleMassFluid] = useState('');
  const [densityMasterSample, setDensityMasterSample] = useState('');
  const [massOfFluid, setMassOfFluid] = useState('');
  const [volumeOfFluid, setVolumeOfFluid] = useState('');
  const [densityOfFluid, setDensityOfFluid] = useState('');
  const [partMassAir, setPartMassAir] = useState('');
  const [partMassFluid, setPartMassFluid] = useState('');
  const [partDensity, setPartDensity] = useState('');
  const [compactnessRatio, setCompactnessRatio] = useState('');
  const [porosity, setPorosity] = useState('');
  const [submitClicked, setSubmitClicked] = useState(false);
  const [partMassAirArray, setPartMassAirArray] = useState([]);
  const [partMassFluidArray, setPartMassFluidArray] = useState([]);
  const [partDensityArray, setPartDensityArray] = useState([]);
  const [compactnessRatioArray, setCompactnessRatioArray] = useState([]);
  const [porosityArray, setPorosityArray] = useState([]);
  // Extract the email from local storage
  const getEmailFromLocalStorage = () => {
    const user = localStorage.getItem('user');
    if (user) {
      const userData = JSON.parse(user);
      return userData.email;
    }
    return null;
  };

  const email = getEmailFromLocalStorage();

  // Fetch user ID based on email
  useEffect(() => {
    const fetchUserId = async () => {
      if (email) {
        try {
          const response = await fetch(`http://localhost:4000/user/user-id/${email}`);
          const data = await response.json();
          setUserId(data.userId);
        } catch (error) {
          console.error('Error fetching user ID:', error);
        }
      }
    };

    fetchUserId();
  }, [email]);

  useEffect(() => {
    const fetchCompactnessRatio = async () => {
      if (partMassAir && partMassFluid && partDensity) {
        try {
          const response = await fetch(`http://localhost:4000/parts/compactness-ratio?partDensity=${partDensity}&theoreticalDensity=${theoreticalDensity}`);
          const data = await response.json();
          setCompactnessRatio(data.compactnessRatio || '0');
          setPorosity(data.porosity || '0');
        } catch (error) {
          console.error('Error fetching compactness ratio and porosity:', error);
          setCompactnessRatio('0');
          setPorosity('0');
        }
      }
    };

    if (submitClicked) {
      fetchCompactnessRatio();
    }
  }, [partMassAir, partMassFluid, partDensity, submitClicked]);

  useEffect(() => {
    const fetchCompactnessRatios = async () => {
      if (partMassAirArray.length && partMassFluidArray.length && partDensityArray.length) {
        try {
          // Initialize arrays to store results
          const updatedCompactnessRatios = [];
          const updatedPorosities = [];
  
          // Iterate over each part and fetch compactness ratio and porosity
          for (let i = 0; i < partDensityArray.length; i++) {
            const partDensity1 = partDensityArray[i];
            console.log(partDensity1);

            const theoreticalDensity1 =theoreticalDensity;
            console.log(theoreticalDensity1)
  
            const response = await fetch(`http://localhost:4000/parts/compactness-ratio?partDensity=${partDensity1}&theoreticalDensity=${theoreticalDensity1}`);
            const data = await response.json();
  
            updatedCompactnessRatios[i] = data.compactnessRatio || '0';
            updatedPorosities[i] = data.porosity || '0';
          }
  
          // Update state with results
          setCompactnessRatioArray(updatedCompactnessRatios);
          setPorosityArray(updatedPorosities);
        } catch (error) {
          console.error('Error fetching compactness ratios and porosities:', error);
          setCompactnessRatioArray(new Array(partDensityArray.length).fill('0'));
          setPorosityArray(new Array(partDensityArray.length).fill('0'));
        }
      }
    };
  
    if (submitClicked) {
      fetchCompactnessRatios();
    }
  }, [partMassAirArray, partMassFluidArray, partDensityArray, submitClicked]);
  

  const handleSubmit = () => {
    // Perform validation for the current screen
    if (currentScreen === 'third') {
      const validation = validateSinglePieceEntry();
      if (!validation.isValid) {
        alert(validation.message);
        return;
      }
    }
  
    setSubmitClicked(true);
  };
  const handleSubmitLot = () => {
    // Perform validation for the current screen
    if (currentScreen === 'third' && singleOrLot==="lot") {
      const validation = validateLotEntry();
      if (!validation.isValid) {
        alert(validation.message);
        return;
      }
    }
  
    setSubmitClicked(true);
  };
  


  // Fetch part codes from backend
  useEffect(() => {
    const fetchPartCodes = async () => {
      if (userId) {
        try {
          const response = await fetch(`http://localhost:4000/parts/part-codes/${userId}`);
          const data = await response.json();
          setPartCodes(data.partCodes);
        } catch (error) {
          console.error('Error fetching part codes:', error);
        }
      }
    };

    fetchPartCodes();
  }, [userId]);

  // Fetch part name based on selected part code
  useEffect(() => {
    const fetchPartName = async () => {
      if (selectedPartCode) {
        try {
          const response = await fetch(`http://localhost:4000/parts/part-name/${selectedPartCode}`);
          const data = await response.json();
          setPartName(data.partName);
        } catch (error) {
          console.error('Error fetching part name:', error);
        }
      }
    };

    fetchPartName();
  }, [selectedPartCode]);

  // Fetch theoretical density based on density type and part code
  useEffect(() => {
    const fetchTheoreticalDensity = async () => {
      if (selectedPartCode && densityType) {
        try {
          let endpoint;

          // Determine the endpoint based on the density type
          if (densityType === 'calculated') {
            endpoint = `http://localhost:4000/parts/calculateDensity/${selectedPartCode}`;
          } else if (densityType === 'specified') {
            endpoint = `http://localhost:4000/parts/specified-density/${selectedPartCode}`;
          } else {
            console.error('Invalid density type');
            return;
          }

          // Fetch the density from the determined endpoint
          const response = await fetch(endpoint);
          const data = await response.json();

          let density;

          // Determine the density based on the density type
          if (densityType === 'calculated') {
            density = data.formattedDensity;
          } else if (densityType === 'specified') {
            density = data.formattedDensity; // Adjust this if necessary based on the response structure
          }

          setTheoreticalDensity(density);
        } catch (error) {
          console.error('Error fetching theoretical density:', error);
        }
      }
    };

    fetchTheoreticalDensity();
  }, [selectedPartCode, densityType]);

  useEffect(() => {
    const calculatePartDensity = async () => {
      // Only proceed if necessary parameters are set
      if (partMassAir && partMassFluid && densityOfFluid) {
        try {
          // Construct the query parameters
          const response = await fetch(`http://localhost:4000/parts/calculate-part-density?partMassAir=${partMassAir}&partMassFluid=${partMassFluid}&attachmentMassAir=${attachmentMassAir}&attachmentMassFluid=${attachmentMassFluid}&densityOfFluid=${densityOfFluid}&attachmentExists=${attachmentExists}`);
          const data = await response.json();
          
          // Set the calculated density or handle if the response is not as expected
          setPartDensity(data.density || '0');
        } catch (error) {
          console.error('Error fetching part density:', error);
          setPartDensity('0');
        }
      } else {
        setPartDensity('');
      }
    };

    calculatePartDensity();
  }, [partMassAir, partMassFluid, attachmentMassAir, attachmentMassFluid, densityOfFluid]);

  useEffect(() => {
    const calculatePartDensities = async () => {
      const updatedDensities = await Promise.all(partMassAirArray.map(async (partMassAir, index) => {
        const partMassFluid = partMassFluidArray[index];
        
        // Only proceed if necessary parameters are set
        if (partMassAir && partMassFluid && densityOfFluid) {
          try {
            // Construct the query parameters
            const response = await fetch(`http://localhost:4000/parts/calculate-part-density?partMassAir=${partMassAir}&partMassFluid=${partMassFluid}&attachmentMassAir=${attachmentMassAir}&attachmentMassFluid=${attachmentMassFluid}&densityOfFluid=${densityOfFluid}&attachmentExists=${attachmentExists}`);
            const data = await response.json();
            
            // Return the calculated density or handle if the response is not as expected
            return data.density || '0';
          } catch (error) {
            console.error('Error fetching part density:', error);
            return '0';
          }
        } else {
          return '';
        }
      }));

      // Update the partDensityArray with the results
      setPartDensityArray(updatedDensities);
    };

    calculatePartDensities();
  }, [partMassAirArray, partMassFluidArray, densityOfFluid, attachmentMassAir, attachmentMassFluid, attachmentExists]);

  // Handlers for new fields
  // Validation function for Single Piece Entry
  const validateSinglePieceEntry = () => {
    if (!partMassAir || !partMassFluid || !densityOfFluid || selectedPartCode==="" || singleOrLot==="" || densityType==="" || attachmentExists==="" || masterExists==="" || (masterAttachmentExists==="" && masterExists==="yes")) {
      return { isValid: false, message: 'Please enter all required fields for Single Piece Entry.' };
    }
    return { isValid: true };
};
const validateLotEntry = () => {
  if (!densityOfFluid || selectedPartCode === "" || singleOrLot === "" || densityType === "" || attachmentExists === "" || masterExists === "" || (masterAttachmentExists === "" && masterExists === "yes")) {
    return { isValid: false, message: 'Please enter all required fields for Lot Entry.' };
  }

  if (partMassAirArray.length === 0 || partMassFluidArray.length === 0 || partDensityArray.length === 0) {
    return { isValid: false, message: 'At least one part must be added.' };
  }

  if (partMassAirArray.length !== partMassFluidArray.length || partMassAirArray.length !== partDensityArray.length) {
    return { isValid: false, message: 'Part mass arrays and density array must have the same number of values.' };
  }

  // Ensure all fields in arrays are filled
  for (let i = 0; i < partMassAirArray.length; i++) {
    if (partMassAirArray[i] === "" || partMassFluidArray[i] === "" || partDensityArray[i] === "") {
      return { isValid: false, message: `Please fill all fields for part ${i + 1}.` };
    }
  }

  return { isValid: true };
};



  const handlePartCodeChange = (event) => {
    setSelectedPartCode(event.target.value);
  };

  const handleSingleOrLotChange = (value) => {
    setSingleOrLot(value);
  };

  const handleDensityTypeChange = (value) => {
    setDensityType(value);
  };

  const handleDateChange = (date) => {
    setDate(date);
  };

  const handleAttachmentExistsChange = (value) => {
    setAttachmentExists(value);
  };

  const handleMasterExistsChange = (value) => {
    setMasterExists(value);
  };

  const handleMasterAttachmentExistsChange = (value) => {
    setMasterAttachmentExists(value);
  };

  const handleAttachmentMassAirChange = (value) => {
    setAttachmentMassAir(value);
  };

  const handleAttachmentMassFluidChange = (value) => {
    setAttachmentMassFluid(value);
  };

  const handleMasterSampleMassAirChange = (value) => {
    setMasterSampleMassAir(value);
  };

  const handleMasterSampleMassFluidChange = (value) => {
    setMasterSampleMassFluid(value);
  };

  const handleDensityMasterSampleChange = (value) => {
    setDensityMasterSample(value);
  };

  const handleMassOfFluidChange = (value) => {
    setMassOfFluid(value);
  };
  
  const handleVolumeOfFluidChange = (value) => {
    setVolumeOfFluid(value);
  };
  
  const handleDensityOfFluidChange = (value) => {
    setDensityOfFluid(value);
  };
  
  const handlePartMassAirChange = (value, index = null) => {
    if (singleOrLot === 'lot' && index !== null) {
      const updatedArray = [...partMassAirArray];
      updatedArray[index] = value;
      setPartMassAirArray(updatedArray);
    } else {
      setPartMassAir(value);
    }
  };
  
  const handlePartMassFluidChange = (value, index = null) => {
    if (singleOrLot === 'lot' && index !== null) {
      const updatedArray = [...partMassFluidArray];
      updatedArray[index] = value;
      setPartMassFluidArray(updatedArray);
    } else {
      setPartMassFluid(value);
    }
  };
  // const handlePartDensityChange = (value) => {
  //   setPartDensity(value);
  // };

  // Navigation handlers
  const goToNextScreen = () => {
    if (currentScreen === 'first') {
      setCurrentScreen('second');
    } else if (currentScreen === 'second') {
      setCurrentScreen('third');
    }
  };

  const goToPreviousScreen = () => {
    if (currentScreen === 'second') {
      setCurrentScreen('first');
    } else if (currentScreen === 'third') {
      setCurrentScreen('second');
    }
  };
  const onAddPart = () => {
    setPartMassAirArray([...partMassAirArray, '']);
    setPartMassFluidArray([...partMassFluidArray, '']);
    setPartDensityArray([...partDensityArray, '']);
  };

  // Handler to remove a specific part
  const onRemovePart = (index) => {
    setPartMassAirArray(partMassAirArray.filter((_, i) => i !== index));
    setPartMassFluidArray(partMassFluidArray.filter((_, i) => i !== index));
    setPartDensityArray(partDensityArray.filter((_, i) => i !== index));
  };

  return (
    <div>
      <Navbar/>
      {currentScreen === 'first' && (
        <FirstEntry 
          partCodes={partCodes}
          onPartCodeChange={handlePartCodeChange}
          partName={partName}
          selectedDate={date}
          onDateChange={handleDateChange}
          singleOrLot={singleOrLot}
          onSingleOrLotChange={handleSingleOrLotChange}
          densityType={densityType}
          onDensityTypeChange={handleDensityTypeChange}
          theoreticalDensity={theoreticalDensity}
          attachmentExists={attachmentExists}
          onAttachmentExistsChange={handleAttachmentExistsChange}
          masterExists={masterExists}
          onMasterExistsChange={handleMasterExistsChange}
          masterAttachmentExists={masterAttachmentExists}
          selectedPartCode={selectedPartCode}
          onMasterAttachmentExistsChange={handleMasterAttachmentExistsChange}
        />
      )}
      {currentScreen === 'second' && (
        <SecondEntry
          attachmentExists={attachmentExists}
          masterExists={masterExists}
          masterAttachmentExists={masterAttachmentExists}
          attachmentMassAir={attachmentMassAir}
          attachmentMassFluid={attachmentMassFluid}
          masterSampleMassAir={masterSampleMassAir}
          masterSampleMassFluid={masterSampleMassFluid}
          densityMasterSample={densityMasterSample}
          onAttachmentMassAirChange={handleAttachmentMassAirChange}
          onAttachmentMassFluidChange={handleAttachmentMassFluidChange}
          onMasterSampleMassAirChange={handleMasterSampleMassAirChange}
          onMasterSampleMassFluidChange={handleMasterSampleMassFluidChange}
          onDensityMasterSampleChange={handleDensityMasterSampleChange}
          massOfFluid={massOfFluid}
  volumeOfFluid={volumeOfFluid}
  densityOfFluid={densityOfFluid}
  onMassOfFluidChange={handleMassOfFluidChange}
  onVolumeOfFluidChange={handleVolumeOfFluidChange}
  onDensityOfFluidChange={handleDensityOfFluidChange}
        />
      )}
      {currentScreen === 'third' && singleOrLot==='single' && (
        <SinglePieceEntry
        partMassAir={partMassAir}
        partMassFluid={partMassFluid}
        partDensity={partDensity}
        compactnessRatio={compactnessRatio}
        porosity={porosity}
        onPartMassAirChange={handlePartMassAirChange}
        onPartMassFluidChange={handlePartMassFluidChange}
        //onPartDensityChange={handlePartDensityChange}
        onSubmit={handleSubmit}
        validateEntry={validateSinglePieceEntry}
      />
      )}
      {currentScreen === 'third' && singleOrLot === 'lot' && (
  <LotEntry
  partMassAirArray={partMassAirArray}
  partMassFluidArray={partMassFluidArray}
  partDensityArray={partDensityArray}
  onPartMassAirChange={handlePartMassAirChange}
  onPartMassFluidChange={handlePartMassFluidChange}
  compactnessRatioArray={compactnessRatioArray}
  porosityArray={porosityArray}
  onAddPart={onAddPart}
  onRemovePart={onRemovePart}
  onSubmit={handleSubmitLot}
  validateLotEntry={validateLotEntry}
  // Include other props as needed
/>
)}
      <div className="flex justify-between p-4">
        {currentScreen !== 'first' && (
          <button 
            onClick={goToPreviousScreen}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          >
            Prev
          </button>
        )}
        {currentScreen !== 'third' && (
          <button 
            onClick={goToNextScreen}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
}

export default UserInput;
