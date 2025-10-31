        const MODEL_URL = 'https://teachablemachine.withgoogle.com/models/Lmy5lQMRJ/';
        
        let recognizer;
        let isListening = false;
        let history = [];

        const elements = {
            micButton: document.getElementById('micButton'),
            status: document.getElementById('status'),
            predictionsList: document.getElementById('predictionsList'),
            predictionsPanel: document.getElementById('predictionsPanel'),
            errorDiv: document.getElementById('error'),
            loadingDiv: document.getElementById('loading'),
            mainContent: document.getElementById('mainContent'),
            door: document.getElementById('door'),
            lamp: document.getElementById('lamp'),
            alarm: document.getElementById('alarm'),
            actionText: document.getElementById('actionText'),
            simTitle: document.getElementById('simTitle'),
            historyList: document.getElementById('historyList')
        };

        const rankEmojis = ['🥇', '🥈', '🥉', '📍', '📍', '📍'];

        async function loadModel() {
            try {
                const checkpointURL = MODEL_URL + 'model.json';
                const metadataURL = MODEL_URL + 'metadata.json';

                recognizer = window.speechCommands.create(
                    'BROWSER_FFT',
                    undefined,
                    checkpointURL,
                    metadataURL
                );

                await recognizer.ensureModelLoaded();
                console.log('Model loaded! Classes:', recognizer.wordLabels());

                elements.loadingDiv.style.display = 'none';
                elements.mainContent.style.display = 'block';
                
            } catch (error) {
                console.error('Error loading model:', error);
                elements.loadingDiv.style.display = 'none';
                showError('Gagal memuat model AI. Pastikan koneksi internet stabil!');
            }
        }

        elements.micButton.addEventListener('click', () => {
            if (!isListening) {
                startListening();
            } else {
                stopListening();
            }
        });

        async function startListening() {
            try {
                elements.errorDiv.classList.remove('show');
                elements.micButton.classList.add('listening');
                elements.status.textContent = '🎧 Mendengarkan... Ucapkan perintah!';
                isListening = true;

                recognizer.listen(result => {
                    const scores = result.scores;
                    const labels = recognizer.wordLabels();
                    
                    const predictions = labels.map((label, i) => ({
                        label: label,
                        score: scores[i]
                    }));

                    predictions.sort((a, b) => b.score - a.score);
                    const topPrediction = predictions[0];

                    if (topPrediction.score > 0.6) {
                        displayResult(topPrediction.label, predictions);
                        executeAction(topPrediction.label);
                        addToHistory(topPrediction.label, topPrediction.score);
                        stopListening();
                    }
                }, {
                    probabilityThreshold: 0.6,
                    includeSpectrogram: false,
                    invokeCallbackOnNoiseAndUnknown: true,
                    overlapFactor: 0.5
                });

            } catch (error) {
                console.error('Error:', error);
                showError('Gagal mengakses mikrofon!');
                stopListening();
            }
        }

        function stopListening() {
            if (recognizer) {
                recognizer.stopListening();
            }
            elements.micButton.classList.remove('listening');
            elements.status.textContent = 'Klik mikrofon untuk mulai';
            isListening = false;
        }

        function displayResult(command, predictions) {
            elements.predictionsList.innerHTML = '';
            
            predictions.forEach((pred, index) => {
                const percentage = (pred.score * 100).toFixed(1);
                
                const item = document.createElement('div');
                item.className = 'prediction-item';
                item.innerHTML = `
                    <div class="prediction-rank">${rankEmojis[index]}</div>
                    <div class="prediction-label">${pred.label}</div>
                    <div class="prediction-bar">
                        <div class="prediction-fill" style="width: ${percentage}%">
                            ${percentage}%
                        </div>
                    </div>
                `;
                elements.predictionsList.appendChild(item);
            });

            elements.predictionsPanel.style.display = 'block';
        }

        function executeAction(command) {
            // Reset all
            elements.door.classList.remove('open');
            elements.lamp.classList.remove('on');
            elements.alarm.classList.remove('active');
            elements.actionText.classList.remove('show');

            let actionMessage = '';

            switch(command) {
                case 'Buka Pintu':
                    elements.door.classList.add('open');
                    actionMessage = '🚪 Pintu Terbuka';
                    elements.simTitle.textContent = '✅ Pintu Berhasil Dibuka!';
                    break;
                
                case 'Tutup Pintu':
                    elements.door.classList.remove('open');
                    actionMessage = '🚪 Pintu Tertutup';
                    elements.simTitle.textContent = '✅ Pintu Berhasil Ditutup!';
                    break;
                
                case 'Nyalakan Lampu':
                    elements.lamp.classList.add('on');
                    actionMessage = '💡 Lampu Menyala';
                    elements.simTitle.textContent = '✅ Lampu Berhasil Dinyalakan!';
                    break;
                
                case 'Panggil Bantuan':
                    elements.alarm.classList.add('active');
                    actionMessage = '🆘 BANTUAN DIPANGGIL!';
                    elements.simTitle.textContent = '🚨 ALARM DARURAT AKTIF!';
                    setTimeout(() => {
                        elements.alarm.classList.remove('active');
                    }, 3000);
                    break;
                
                case 'Background Noise':
                    actionMessage = '🔊 Noise Terdeteksi';
                    elements.simTitle.textContent = '⚠️ Background Noise';
                    break;
                
                case 'Silence':
                    actionMessage = '🤫 Hening';
                    elements.simTitle.textContent = '💤 Ruangan Tenang';
                    break;
            }

            elements.actionText.textContent = actionMessage;
            elements.actionText.classList.add('show');

            // Audio feedback
            if ('speechSynthesis' in window && command !== 'Background Noise' && command !== 'Silence') {
                const utterance = new SpeechSynthesisUtterance(actionMessage);
                utterance.lang = 'id-ID';
                utterance.rate = 0.9;
                window.speechSynthesis.speak(utterance);
            }

            // Reset simulation title after 3 seconds
            setTimeout(() => {
                elements.simTitle.textContent = '💭 Simulasi Ruangan Lansia';
            }, 3000);
        }

        function addToHistory(command, confidence) {
            const now = new Date();
            const timeStr = now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
            const confPercent = (confidence * 100).toFixed(1);
            
            history.unshift({
                command: command,
                time: timeStr,
                confidence: confPercent
            });

            // Keep only last 10
            if (history.length > 10) history.pop();

            updateHistoryDisplay();
        }

        function updateHistoryDisplay() {
            if (history.length === 0) {
                elements.historyList.innerHTML = '<p style="color: #9ca3af; text-align: center;">Belum ada perintah</p>';
                return;
            }

            elements.historyList.innerHTML = history.map(item => `
                <div class="history-item">
                    <strong>${item.command}</strong> 
                    <span style="color: #10b981;">(${item.confidence}%)</span>
                    <div class="history-time">${item.time}</div>
                </div>
            `).join('');
        }

        function showError(message) {
            elements.errorDiv.textContent = '❌ ' + message;
            elements.errorDiv.classList.add('show');
        }

        window.addEventListener('load', loadModel);
