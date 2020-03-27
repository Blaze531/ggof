EnotLaser = new BulletType(0.001f, 70){
            Color tmpColor = new Color();
            Color[] colors = {Color.valueOf("ec745855"), Color.valueOf("ec7458aa"), Color.valueOf("ff9c5a"), Color.white};
            float[] tscales = {1f, 0.7f, 0.5f, 0.2f};
            float[] strokes = {2f, 1.5f, 1f, 0.3f};
            float[] lenscales = {1f, 1.12f, 1.15f, 1.17f};
            float length = 220f;

            {
                hitEffect = Fx.hitMeltdown;
                despawnEffect = Fx.none;
                hitSize = 4;
                drawSize = 420f;
                lifetime = 30f;
                pierce = true;
            }

            @Override
            public void update(Bullet b){
                if(b.timer.get(1, 5f)){
                    Damage.collideLine(b, b.getTeam(), hitEffect, b.x, b.y, b.rot(), length, true);
                }
                Effects.shake(1f, 1f, b.x, b.y);
            }

            @Override
            public void hit(Bullet b, float hitx, float hity){
                Effects.effect(hitEffect, colors[2], hitx, hity);
                if(Mathf.chance(0.4)){
                    Fire.create(world.tileWorld(hitx + Mathf.range(5f), hity + Mathf.range(5f)));
                }
            }

            @Override
            public void draw(Bullet b){
                float baseLen = (length) * b.fout();

                Lines.lineAngle(b.x, b.y, b.rot(), baseLen);
                for(int s = 0; s < colors.length; s++){
                    Draw.color(tmpColor.set(colors[s]).mul(1f + Mathf.absin(Time.time(), 1f, 0.1f)));
                    for(int i = 0; i < tscales.length; i++){
                        Tmp.v1.trns(b.rot() + 180f, (lenscales[i] - 1f) * 35f);
                        Lines.stroke((9f + Mathf.absin(Time.time(), 0.8f, 1.5f)) * b.fout() * strokes[s] * tscales[i]);
                        Lines.lineAngle(b.x + Tmp.v1.x, b.y + Tmp.v1.y, b.rot(), baseLen * lenscales[i], CapStyle.none);
                    }
                }
                Draw.reset();
            }
        };
