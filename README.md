# KMeans Visualizer

This project is an interactive K-Means clustering visualizer built using a full-stack approach. The frontend is implemented in React, and the backend uses Python with Flask and scikit-learn.

Users can place data points and cluster centers on a canvas. After placement, the backend computes cluster assignments and updates the cluster centers using the K-Means algorithm.

---

## How it works

1. Users click on the canvas to add either data points or cluster centers.
2. When "Classify Points" is clicked, each data point is assigned to the nearest cluster center based on Euclidean distance.
3. These computations are done via the backend endpoint `/cluster`.

---

## Backend clustering logic

The Flask backend exposes a `/cluster` POST endpoint that accepts:

```json
{
  "points": [{ "x": ..., "y": ... }, ...],
  "clusterCenters": [{ "x": ..., "y": ... }, ...]
}
```

It uses scikit-learn's KMeans class to perform clustering with the provided cluster centers as initialization.

## Before calculating clusters

<img width="1025" alt="Before Clustering" src="https://github.com/user-attachments/assets/3ef67f8a-6316-47eb-8e39-4f572fb6ee8e" />

## After calculating clusters

<img width="979" alt="After Clustering" src="https://github.com/user-attachments/assets/0324895d-80c7-4d2c-85b8-76db0919bdc3" />
