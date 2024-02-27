window.onload = function() {
    // Mendapatkan referensi ke elemen canvas
    var canvas = document.getElementById("webgl-canvas");
    
    // Inisialisasi WebGL
    var gl = canvas.getContext("webgl");

    if (!gl) {
        console.error("WebGL tidak tersedia.");
        return;
    }

    // Menentukan ukuran viewport
    gl.viewport(0, 0, canvas.width, canvas.height);

    // Membersihkan layar
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    // Shader vertex
    var vertexShaderSource = `
        attribute vec2 a_position;
        attribute vec4 a_color; // Menambahkan atribut warna
        varying vec4 v_color; // Menambahkan varying untuk meneruskan warna ke fragment shader
        void main() {
            gl_Position = vec4(a_position, 0.0, 1.0);
            gl_PointSize = 5.0; // Ukuran titik
            v_color = a_color; // Meneruskan warna ke fragment shader
        }
    `;

    // Shader fragment
    var fragmentShaderSource = `
        precision mediump float;
        varying vec4 v_color; // Menerima warna dari vertex shader
        void main() {
            gl_FragColor = v_color; // Warna titik (diteruskan dari atribut)
        }
    `;

    // Membuat shader vertex
    var vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader, vertexShaderSource);
    gl.compileShader(vertexShader);

    // Membuat shader fragment
    var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader, fragmentShaderSource);
    gl.compileShader(fragmentShader);

    // Membuat program shader
    var shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);
    gl.useProgram(shaderProgram);

    // Mendefinisikan posisi titik-titik
    var positions = [
        -0.5,  0.5,
        -0.25, 0.25,
        0,     0,
        0.25,  0.25,
        0.5,   0.5,
        -0.5, -0.5,
        -0.25, -0.25,
        0,     0,
        0.25, -0.25,
        0.5,  -0.5,
    ];

    // Membuat buffer untuk posisi
    var positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

    // Mendapatkan lokasi atribut a_position
    var positionAttributeLocation = gl.getAttribLocation(shaderProgram, "a_position");

    // Mengaktifkan atribut
    gl.enableVertexAttribArray(positionAttributeLocation);

    // Menghubungkan buffer posisi dengan atribut
    gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0);

    // Mendefinisikan warna-warni
    var colors = [
        [1.0, 0.0, 0.0, 1.0],  // Merah
        [0.0, 1.0, 0.0, 1.0],  // Hijau
        [0.0, 0.0, 1.0, 1.0],  // Biru
        [1.0, 1.0, 0.0, 1.0],  // Kuning
        [1.0, 0.0, 1.0, 1.0],  // Magenta
        [0.0, 1.0, 1.0, 1.0],  // Cyan
        [0.5, 0.5, 0.5, 1.0],  // Abu-abu
        [1.0, 0.5, 0.0, 1.0],  // Oranye
        [0.5, 0.0, 1.0, 1.0],  // Ungu
        [0.0, 0.5, 0.5, 1.0],  // Biru Hijau
    ];

    // Membuat buffer untuk warna
    var colorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors.flat()), gl.STATIC_DRAW);

    // Mendapatkan lokasi atribut a_color
    var colorAttributeLocation = gl.getAttribLocation(shaderProgram, "a_color");

    // Mengaktifkan atribut
    gl.enableVertexAttribArray(colorAttributeLocation);

    // Menghubungkan buffer warna dengan atribut
    gl.vertexAttribPointer(colorAttributeLocation, 4, gl.FLOAT, false, 0, 0);

    // Menggambar titik-titik dengan warna-warni
    gl.drawArrays(gl.POINTS, 0, positions.length / 2);
};
