from flask import Flask, request, jsonify
import random

app = Flask(__name__)

@app.route('/health', methods=['GET'])
def health():
    return jsonify({"status": "AI Microservice Online", "version": "1.0.0"})

@app.route('/ai/script-generator', methods=['POST'])
def generate_script():
    data = request.json
    topic = data.get('topic', 'Tech Review')
    niche = data.get('niche', 'Technology')
    
    script_output = {
        "hook": f"Did you know that {topic} is about to change everything in {niche}?",
        "intro": f"Welcome back! Today we are diving deep into {topic}.",
        "scene1": f"Scene 1: Demonstration of key features of {topic}.",
        "scene2": f"Scene 2: Comparing with top industry benchmarks.",
        "callToAction": "If you enjoyed this breakdown, hit subscribe and share your thoughts below!"
    }
    return jsonify({"success": True, "script": script_output})

@app.route('/ai/auto-dubbing', methods=['POST'])
def auto_dubbing():
    data = request.json
    video_id = data.get('videoId')
    target_lang = data.get('targetLanguage', 'hi')
    
    # Simulated AI speech synthesis & neural machine translation payload
    return jsonify({
        "success": True,
        "videoId": video_id,
        "language": target_lang,
        "dubbedAudioUrl": f"https://cdn.mytube.com/dubbed/{video_id}_{target_lang}.mp3",
        "translatedSubtitlesUrl": f"https://cdn.mytube.com/subtitles/{video_id}_{target_lang}.vtt"
    })

if __name__ == '__main__':
    app.run(port=5001, debug=True)
