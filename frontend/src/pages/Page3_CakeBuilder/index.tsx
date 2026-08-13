.container {
  min-height: 100vh;
  padding: 4rem 2rem;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  overflow-x: hidden;
}

.title {
  text-align: center;
  font-family: 'Great Vibes', cursive;
  font-size: 4rem;
  color: #2d3436;
  margin-bottom: 4rem;
}

.timeline {
  position: relative;
  max-width: 1200px;
  margin: 0 auto;
}

.timeline::after {
  content: '';
  position: absolute;
  width: 4px;
  background: linear-gradient(180deg, #667eea, #764ba2);
  top: 0;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 2px;
}

.event {
  position: relative;
  width: 50%;
  padding: 2rem;
  margin-bottom: 2rem;
  box-sizing: border-box;
}

.left {
  left: 0;
  padding-right: 4rem;
  text-align: right;
}

.right {
  left: 50%;
  padding-left: 4rem;
  text-align: left;
}

.icon {
  font-size: 3rem;
  margin-bottom: 0.5rem;
}

.year {
  font-size: 2rem;
  font-weight: 700;
  color: #667eea;
  margin-bottom: 0.5rem;
}

.eventTitle {
  font-size: 1.5rem;
  color: #2d3436;
  margin-bottom: 0.5rem;
}

.description {
  color: #636e72;
  font-size: 1rem;
  line-height: 1.6;
}

.event::before {
  content: '';
  position: absolute;
  width: 20px;
  height: 20px;
  background: #764ba2;
  border-radius: 50%;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
}

.left::before {
  right: -10px;
}

.right::before {
  left: -10px;
}

@media (max-width: 768px) {
  .title {
    font-size: 2.5rem;
  }
  
  .timeline::after {
    left: 20px;
  }
  
  .event {
    width: 100%;
    padding-left: 3rem;
    padding-right: 1rem;
    text-align: left;
  }
  
  .left {
    left: 0;
    padding-right: 1rem;
  }
  
  .right {
    left: 0;
    padding-left: 3rem;
  }
  
  .left::before,
  .right::before {
    left: 10px;
  }
}