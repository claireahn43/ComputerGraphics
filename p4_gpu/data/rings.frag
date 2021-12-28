// Fragment shader

#ifdef GL_ES
precision mediump float;
precision mediump int;
#endif

#define PROCESSING_LIGHT_SHADER

// These values come from the vertex shader
varying vec4 vertColor;
varying vec3 vertNormal;
varying vec3 vertLightDir;
varying vec4 vertTexCoord;

void main() {
  //drawing a circle
  vec2 currPos = vec2(vertTexCoord.s, vertTexCoord.t); //current position
  vec2 center = vec2(0.5, 0.5);
  
  vec2 pos1 = vec2(center.x + 0.35 * cos(radians(0)), center.y + 0.35 * sin(radians(0))); //little circle position
  vec2 pos2 = vec2(center.x + 0.35 * cos(radians(45)), center.y + 0.35 * sin(radians(45))); //little circle position
  vec2 pos3 = vec2(center.x + 0.35 * cos(radians(90)), center.y + 0.35 * sin(radians(90))); //little circle position
  vec2 pos4 = vec2(center.x + 0.35 * cos(radians(135)), center.y + 0.35 * sin(radians(135))); //little circle position
  vec2 pos5 = vec2(center.x + 0.35 * cos(radians(180)), center.y + 0.35 * sin(radians(180))); //little circle position
  vec2 pos6 = vec2(center.x + 0.35 * cos(radians(225)), center.y + 0.35 * sin(radians(225))); //little circle position
  vec2 pos7 = vec2(center.x + 0.35 * cos(radians(270)), center.y + 0.35 * sin(radians(270))); //little circle position
  vec2 pos8 = vec2(center.x + 0.35 * cos(radians(315)), center.y + 0.35 * sin(radians(315))); //little circle position
  vec2 pos9 = vec2(0.5, 0.5); //rectangle position

  if (distance(center, currPos) > 0.5) {
    gl_FragColor = vec4(0,1,1,0); //big circle outline
  } else if (distance(pos1, currPos) < 0.08) {
    gl_FragColor = vec4(0,1,1,0);
  } else if (distance(pos2, currPos) < 0.08) {
    gl_FragColor = vec4(0,1,1,0);
  } else if (distance(pos3, currPos) < 0.08) {
    gl_FragColor = vec4(0,1,1,0);
  } else if (distance(pos4, currPos) < 0.08) {
    gl_FragColor = vec4(0,1,1,0);
  } else if (distance(pos5, currPos) < 0.08) {
    gl_FragColor = vec4(0,1,1,0);
  } else if (distance(pos6, currPos) < 0.08) {
    gl_FragColor = vec4(0,1,1,0);
  } else if (distance(pos7, currPos) < 0.08) {
    gl_FragColor = vec4(0,1,1,0);
  } else if (distance(pos8, currPos) < 0.08) {
    gl_FragColor = vec4(0,1,1,0);
  } else if (abs(currPos.x - center.x) < 0.1 && abs(currPos.y- center.y) < 0.1) {
    gl_FragColor = vec4(0,1,1,0);
  } else {
    gl_FragColor = vec4(0.8,0.6,0.85,1); //fill in
  }
  
}
