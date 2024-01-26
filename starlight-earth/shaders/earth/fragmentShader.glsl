uniform sampler2D uTexture;
varying vec2 vUv;

void main()
{


  vec4 map = texture2D(uTexture, vUv);
  vec3 color = 1.0 - map.rgb;
  float alpha = color.r;

  float x = fract(vUv.x * 100.0);
  float y = fract(vUv.y * 100.0);

  float dist = length(vec2(x, y) - 0.5);


  vec3 green = vec3(0.0, 1.0, 0.0);
  vec3 finalColor = mix(green, vec3(0.0), step(0.1, dist));
  finalColor.g += map.r * 2.0; 


  gl_FragColor = vec4(finalColor, alpha);
}