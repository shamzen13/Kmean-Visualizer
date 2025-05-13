import React, { useState } from 'react';
import './App.css';

const predefinedColors = [
  '#FF5733', '#33FF57', '#5733FF', '#FFFF33', '#33FFFF',
  '#FF33FF', '#FF3366', '#3399FF', '#FF6600', '#00FF66',
  '#CC00FF', '#FF00CC', '#FF9900', '#00FF99', '#6600FF',
  '#00FFFF', '#FFCC00', '#9900FF', '#33FFCC', '#FF3300'
];

function App() {
  const [points, setPoints] = useState([]);
  const [clusterCenters, setClusterCenters] = useState([]);
  const [clusterColors, setClusterColors] = useState([]);
  const [clusterAssignments, setClusterAssignments] = useState([]);
  const [inInsertClusterMode, setInInsertClusterMode] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleGridClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (inInsertClusterMode) {
      const color = predefinedColors[clusterCenters.length % predefinedColors.length];
      setClusterCenters([...clusterCenters, { x, y }]);
      setClusterColors([...clusterColors, color]);
    } else {
      setPoints([...points, { x, y }]);
      setClusterAssignments([]); // reset assignments for color change
    }
  };

  const calculateClusters = async () => {
    if (clusterCenters.length === 0 || points.length === 0) return;

    setLoading(true);
    try {
      const response = await fetch('http://localhost:5001/cluster', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          points,
          clusterCenters
        }),
      });

      const data = await response.json();
      setClusterAssignments(data.assignments);
    } catch (error) {
      console.error('Error fetching cluster data:', error);
    }
    setLoading(false);
  };

  const clearAll = () => {
    setPoints([]);
    setClusterCenters([]);
    setClusterAssignments([]);
    setClusterColors([]);
  };

  return (
    <div className="App">

      {/* BUTTONS */ }
      <h1>K-Means Clustering Visualization</h1>
   
      <div className='buttons' >
      <button onClick={() => setInInsertClusterMode(!inInsertClusterMode)}>
        {inInsertClusterMode ? 'Switch to Add Points' : 'Add Cluster'}
      </button>

      <button onClick={calculateClusters} disabled={loading}>
        {loading ? '...' : 'Calculate Clusters'}
      </button>

      <button onClick={clearAll}>Clear All</button>


      </div>

   


        {/* axis */}
        <div className="grid" onClick={handleGridClick} style={{
        position: 'relative',
        width: '600px',
        height: '600px',
        border: '1px solid #ccc'
      }}>

        <div style={{
          position: 'absolute', top: '50%', left: 0,
          width: '100%', height: '1px', backgroundColor: '#888'
        }} />
        <div style={{
          position: 'absolute', left: '50%', top: 0,
          width: '1px', height: '100%', backgroundColor: '#888'
        }} />





        {/* pts */}
        {points.map((point, index) => (
          <div
            key={`point-${index}`}
            className="point"
            style={{
              position: 'absolute',
              left: point.x - 5,
              top: point.y - 5,
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              backgroundColor: clusterAssignments[index] !== undefined
                ? clusterColors[clusterAssignments[index]]
                : 'black'
            }}
          ></div>
        ))}





        {/* cluster center*/}
        {clusterCenters.map((center, index) => (
          <div
            key={`center-${index}`}
            className="cluster-center"
            style={{
              position: 'absolute',
              left: center.x - 10,
              top: center.y - 10,
              width: '20px',
              height: '20px',
              borderRadius: '50%',
              backgroundColor: clusterColors[index]
            }}
          ></div>
        ))}
      </div>
    </div>
  );
}

export default App;
