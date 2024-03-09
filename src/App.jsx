import React, { useState, useEffect } from 'react';
import Tabs from './components/Tabs.jsx';
import Tab from './components/Tab.jsx';
import { data } from './data.jsx'; 

const proficiencyScores = {
  Unfamiliar: 0,
  Partial: 1,
  Familiar: 2
};

// Function to save data to localStorage
const saveDataToLocalStorage = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

// Function to load data from localStorage
const loadDataFromLocalStorage = (key) => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
};


const App = () => {
  const [activeTab, setActiveTab] = useState(-1);
  const [careerScores, setCareerScores] = useState({});

  const handleTabClick = (index, list) => {
    setActiveTab(index);
    setActiveList(list);
  };

  // State to hold the selected proficiency level
  const [selectedProficiency, setSelectedProficiency] = useState(loadDataFromLocalStorage('selectedProficiency') || {});

  // Function to handle proficiency change
  const handleProficiencyChange = (index, subindex, e) => {
    const { value } = e.target;
    setSelectedProficiency(prevState => ({
      ...prevState,
      [`${index}${subindex}`]: value,
    }));
  };

  useEffect(() => {
    // Calculate scores when proficiency levels change
    const scores = {};
    data.forEach((item, index) => {
      let totalScore = 0;
      item.list.forEach((skill, subindex) => {
        const proficiencyLevel = selectedProficiency[`${index}${subindex}`];
        totalScore += proficiencyScores[proficiencyLevel];
      });
      const averageScore = totalScore / item.list.length;
      scores[index] = averageScore;
    });
    setCareerScores(scores);
  
    // Save selected proficiency to localStorage
    saveDataToLocalStorage('selectedProficiency', selectedProficiency);
  }, [selectedProficiency]);

  return (
    <>
      <h1>Careers</h1>
      <Tabs>
        {data.map((item, index) => (
          <Tab key={index} onClick={() => handleTabClick(index, item.list)} isActive={activeTab === index}>{item.career}</Tab>
        ))}
      </Tabs>
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th scope="col">Skill</th>
            <th scope="col">Proficiency</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            item.list.map((skill, subindex) => (
              <tr key={`${index}${subindex}`} style={{ display: activeTab === index ? "" : "none" }}>
                <td>{skill}</td>
                <td>
                  <select 
                    name={`proficiency-${index}-${subindex}`} 
                    id={`proficiency-${index}-${subindex}`}
                    value={selectedProficiency[`${index}${subindex}`] || ''}
                    onChange={(e) => handleProficiencyChange(index, subindex, e)}
                    style={{
                      backgroundColor:
                        selectedProficiency[`${index}${subindex}`] === 'Unfamiliar'
                          ? 'rgba(230, 68, 39, 0.4)' // Change to desired color for 'Unfamiliar'
                          : selectedProficiency[`${index}${subindex}`] === 'Partial'
                          ? 'rgba(224, 212, 38, 0.4)' // Change to desired color for 'Partial'
                          : selectedProficiency[`${index}${subindex}`] === 'Familiar'
                          ? 'rgba(50, 168, 82, 0.4)' // Change to desired color for 'Familiar'
                          : 'transparent' // Default color
                    }}
                  >
                    <option>-</option>
                    <option value="Unfamiliar">Unfamiliar</option>
                    <option value="Partial">Partial</option>
                    <option value="Familiar">Familiar</option>
                  </select>
                </td>
              </tr>
            ))
          ))}
        </tbody>
      </table>
      <div>
        <h2>Career Proficiency Scores</h2>
        <ul>
          {data.map((item, index) => (
            <li key={index}>
              {item.career}: {Math.round(careerScores[index] / 2 * 100) || '-'}%
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
