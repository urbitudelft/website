from flask import Flask
import subprocess

app = Flask(__name__)

@app.route('/update', methods=['GET'])
def update():
    repo_path = '/var/www/website'
    hugo_path = '/usr/local/bin/hugo'  # Adjust if hugo is elsewhere

    try:
        git_pull = subprocess.check_output(['git', '-C', repo_path, 'pull'], stderr=subprocess.STDOUT)
        hugo_build = subprocess.check_output([hugo_path, '-s', repo_path + '/urbi'], stderr=subprocess.STDOUT)
        return f"<h1>Git Pull Output</h1><pre>{git_pull.decode()}</pre><h1>Hugo Build Output</h1><pre>{hugo_build.decode()}</pre>"
    except subprocess.CalledProcessError as e:
        return f"<h1>Error</h1><pre>{e.output.decode()}</pre>", 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)