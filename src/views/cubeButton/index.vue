<template>
  <div class="buttons-list">
    <div v-if="false" class="buttons">
      <button class="btn btn-primary btn-ghost">
        Ghost
      </button>
      <button class="btn btn-primary btn-jittery">
        <i class="fas fa-shopping-cart" />
        <span>6</span>
      </button>
      <button class="btn btn-primary btn-finger">
        Finger
      </button>
      <button class="btn btn-primary btn-icon">
        <i class="fas fa-arrow-circle-left" />
        <span>Logout</span>
      </button>
      <button class="btn btn-primary btn-jelly">
        Jelly
      </button>
      <button class="btn btn-primary btn-ghost btn-fill">
        Fill In
      </button>
      <button class="btn btn-primary btn-pulse">
        Pulse
      </button>
      <button class="btn btn-primary btn-shock">
        Shock
      </button>
      <button class="btn btn-primary btn-ghost btn-open">
        Open
      </button>
      <button class="btn btn-primary btn-ghost btn-close">
        Close
      </button>
      <button class="btn btn-primary btn-ghost btn-slash">
        Slash
      </button>
      <button class="btn btn-primary btn-ghost btn-fill-up">
        Fill Up
      </button>
      <button class="btn btn-primary btn-ghost btn-slide">
        Slide
      </button>
      <button class="btn btn-primary btn-ghost btn-offset">
        Offset
      </button>
      <button class="btn btn-primary btn-ghost btn-flip-down">
        Flip Down
        <div class="front">Flip Down</div>
        <div class="back">Flip Down</div>
      </button>
      <button class="btn btn-primary btn-ghost btn-breach">
        Breach
      </button>
      <button class="btn btn-primary btn-marquee">
        <span data-text="Marquee">Marquee</span>
      </button>
      <button class="btn btn-primary btn-ghost btn-cross">
        Cross Bar
      </button>
      <button class="btn btn-primary btn-ghost btn-open-line">
        Line
      </button>
    </div>

    <div v-if="false" class="gradient-border"> awesome line </div>

    <NoticeBarList class="NoticeBarList">
      <div> NoticeBarList 123123123214353453453453465656465464 ok  </div>
    </NoticeBarList>
    <NoticeBarList class="NoticeBarList">
      <div> NoticeBarList 123123123214353453453453465656465464 ok  </div>
    </NoticeBarList>
    <NoticeBarList class="NoticeBarList">
      <div> NoticeBarList 123123123214353453453453465656465464 ok  </div>
    </NoticeBarList>
  </div>
</template>

<script>

import NoticeBarList from './noticeBarList'
export default {
  components: {
    NoticeBarList
  }
}
</script>

<style lang="scss" scoped>

.buttons-list{
  width: 200px;
}

.buttons{
  margin-top: 60px;
  background: #ffffff;
}

.btn {
  --hue: 190;
  position: relative;
  padding: 0.375rem 0.75rem;
  margin: 1rem;
  font-size: 1rem;
  line-height: 1.5;
  color: white;
  text-decoration: none;
  background-color: hsl(var(--hue), 100%, 41%);
  border: 1px solid hsl(var(--hue), 100%, 41%);
  border-radius: 3px;
  outline: transparent;
  overflow: hidden;
  cursor: pointer;
  user-select: none;
  white-space: nowrap;
  transition: 0.25s;
  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.45);

  &:hover {
    background: hsl(var(--hue), 100%, 31%);
  }

  &-primary {
    --hue: 171;
  }

  &-ghost {
    color: hsl(var(--hue), 100%, 41%);
    background-color: transparent;
    border-color: hsl(var(--hue), 100%, 41%);

    &:hover {
      color: white;
      background: hsl(var(--hue), 100%, 41%);
    }
  }

  &-jittery {
    animation: jittery 4s infinite;
  }

  &-finger {
    overflow: visible;

    &::before {
      position: absolute;
      content: "👇";
      top: -68px;
      right: 0;
      font-size: 60px;
      transform: scaleX(-1);
      animation: up-down 1s infinite;
    }
  }

  &-icon {
    position: relative;
    margin-left: 8px;

    i {
      position: absolute;
      top: 10%;
      left: 40%;
      transform: translate(-16%, 400%);
      transition: 0.2s;
    }

    span {
      display: flex;
      justify-content: center;
      align-items: center;
      transition: 0.2s;
    }

    &:hover {
      i {
        transform: translate(-16%, 42%);
      }

      span {
        transform: translateY(-400%);
      }
    }
  }

  &-jelly {
    &:hover {
      animation: jelly 0.5s;
    }
  }

  &-fill {
    &:hover {
      background: transparent;
      box-shadow: inset 0 0 0 2em hsl(var(--hue), 100%, 41%);
    }
  }

  &-open {
    &::before {
      position: absolute;
      content: "";
      top: 0;
      left: 0;
      z-index: -1;
      width: 100%;
      height: 100%;
      background: hsl(var(--hue), 100%, 41%);
      transform: scaleX(0);
      transition: 0.25s;
    }

    &:hover {
      background: transparent;

      &::before {
        transform: scaleX(1);
      }
    }
  }

  &-pulse {
    &:hover {
      box-shadow: 0 0 0 1em transparent;
      animation: pulse 1s;
    }
  }

  &-shock {
    background: transparent;
    border-color: transparent;
    overflow: visible;

    &:hover {
      background: transparent;
    }

    &::before,
    &::after {
      position: absolute;
      content: "";
      top: -1px;
      left: -1px;
      right: -1px;
      bottom: -1px;
      border: inherit;
      border-radius: inherit;
      transition: 0.3s;
    }

    &::before {
      z-index: -1;
      background: hsl(var(--hue), 100%, 41%);
    }

    &::after {
      z-index: -2;
      background: #222;
      border-color: hsl(var(--hue), 100%, 41%);
      transform: scale(0.5);
    }

    &:hover {
      color: hsl(var(--hue), 100%, 41%);

      &::before {
        opacity: 0;
        transform: scale(1.2);
      }

      &::after {
        transform: scale(1);
      }
    }
  }

  &-close {
    &:hover {
      background: transparent;
      box-shadow: inset 3em 0 0 0 hsl(var(--hue), 100%, 41%),
        inset -3em 0 0 0 hsl(var(--hue), 100%, 41%);
    }
  }

  &-slash {
    &::before {
      position: absolute;
      content: "";
      top: 50%;
      left: 50%;
      z-index: -1;
      width: 120%;
      height: 200%;
      background: hsl(var(--hue), 100%, 41%);
      transform: translate(-50%, -50%) rotate(-45deg) scaleX(0);
      transition: 0.25s;
    }

    &:hover {
      background: transparent;

      &::before {
        transform: translate(-50%, -50%) rotate(-45deg) scaleX(1);
      }
    }
  }

  &-fill-up {
    &:hover {
      background: transparent;
      box-shadow: inset 0 -3em 0 0 hsl(var(--hue), 100%, 41%);
    }
  }

  &-slide {
    &:hover {
      background: transparent;
      box-shadow: inset 4em 0 0 0 hsl(var(--hue), 100%, 41%);
    }
  }

  &-offset {
    border-radius: 0;
    box-shadow: 0.3em 0.3em 0 0 hsl(var(--hue), 100%, 41%),
      inset 0.3em 0.3em 0 0 hsl(var(--hue), 100%, 41%);

    &:hover {
      --hue: 196;
      background: transparent;
      box-shadow: 0 0 0 0 hsl(var(--hue), 100%, 41%),
        inset 6em 4em 0 0 hsl(var(--hue), 100%, 41%);
    }
  }

  &-flip-down {
    --flip-button-height: 40px;
    height: var(--flip-button-height);
    color: transparent;
    border: none;
    border-radius: 0;
    perspective: 500px;
    overflow: visible;

    &:hover {
      color: transparent;
      background: transparent;
    }

    .front,
    .back {
      position: absolute;
      top: 0;
      left: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;
    }

    .front {
      background: hsl(var(--hue), 100%, 41%);
      color: white;
      transition: 0.25s;
      transform-origin: center center calc(var(--flip-button-height) / -2);
    }

    .back {
      --hue: 196;
      color: white;
      background: hsl(var(--hue), 100%, 41%);
      transform: rotateX(88deg);
      transform-origin: center center calc(var(--flip-button-height) / -2);
      transition: 0.25s;
    }

    &:hover {
      .front {
        transform: rotateX(-90deg);
      }

      .back {
        transform: rotateX(0deg);
      }
    }
  }

  &-breach {
    border-width: 4px;
    border-radius: 0;
    overflow: visible;

    &::before,
    &::after {
      position: absolute;
      content: "";
      width: 14px;
      height: 4px;
      background: #222;
      transform: skewX(60deg);
      transition: 0.4s linear;
    }

    &::before {
      top: -4px;
      left: 10%;
    }

    &::after {
      bottom: -4px;
      right: 10%;
    }

    &:hover {
      color: hsl(var(--hue), 100%, 41%);
      background: transparent;

      &::before {
        transform: translateX(360%) skewX(60deg);
      }

      &::after {
        transform: translateX(-360%) skewX(60deg);
      }
    }
  }

  &-marquee {
    font-weight: 600;
    border: none;
    border-radius: 1.5rem;

    &:hover {
      --hue: 230;
      transform: scale(1.1);
    }
    span {
      display: block;
      padding: 0 20px;
      animation: move-left 2s linear infinite;
      &::after {
        position: absolute;
        content: attr(data-text);
        top: 0;
        left: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
      }
    }
  }

  &-cross {
    border-radius: 1.5rem;

    &::before,
    &::after {
      position: absolute;
      content: "";
      left: 0;
      z-index: -1;
      width: 100%;
      height: 50%;
      background: hsl(var(--hue), 100%, 41%);
      transform: scaleX(0);
      transition: transform 0.5s;
    }

    &::before {
      top: 0;
      transform-origin: left;
    }

    &::after {
      top: 50%;
      transform-origin: right;
    }

    &:hover {
      background: transparent;

      &::before,
      &::after {
        transform: scaleX(1);
      }

      &::before {
        transform-origin: right;
      }

      &::after {
        transform-origin: left;
      }
    }
  }

  &-open-line {
    border: none;
    overflow: visible;

    &::before,
    &::after {
      position: absolute;
      content: "";
      left: 0;
      width: 100%;
      height: 1px;
      background: hsl(var(--hue), 100%, 41%);
      opacity: 0;
      transform: scaleX(0);
      transition: 0.4s ease-in-out;
    }

    &::before {
      top: 0;
    }

    &::after {
      bottom: 0;
    }

    &:hover {
      letter-spacing: 5px;
      color: hsl(var(--hue), 100%, 41%);
      background: transparent;

      &::before,
      &::after {
        opacity: 1;
        transform: scaleX(1.2);
      }
    }
  }
}

@keyframes jittery {
  5%,
  50% {
    transform: scale(1);
  }

  10% {
    transform: scale(0.9);
  }

  15% {
    transform: scale(1.15);
  }

  20% {
    transform: scale(1.15) rotate(-5deg);
  }

  25% {
    transform: scale(1.15) rotate(5deg);
  }

  30% {
    transform: scale(1.15) rotate(-3deg);
  }

  35% {
    transform: scale(1.15) rotate(2deg);
  }

  40% {
    transform: scale(1.15) rotate(0);
  }
}

@keyframes jelly {
  25% {
    transform: scale(0.9, 1.1);
  }

  50% {
    transform: scale(1.1, 0.9);
  }

  75% {
    transform: scale(0.95, 1.05);
  }
}

@keyframes up-down {
  50% {
    transform: translateY(-20px) scaleX(-1);
  }
}

@keyframes pulse {
  from {
    box-shadow: 0 0 0 0 hsl(var(--hue), 100%, 41%);
  }
}

@keyframes move-left {
  to {
    transform: translateX(-100%);
  }
}

////////
.gradient-border {
  --border-width: 3px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 300px;
  height: 200px;
  font-family: Lato, sans-serif;
  font-size: 2.5rem;
  text-transform: uppercase;
  color: white;
  // background: #222;
  border-radius: var(--border-width);
  text-align: center;
}

.gradient-border::after {
  position: absolute;
  content: "";
  top: calc(-1 * var(--border-width));
  left: calc(-1 * var(--border-width));
  z-index: -1;
  width: calc(100% + var(--border-width) * 2);
  height: calc(100% + var(--border-width) * 2);
  background: linear-gradient(60deg, #5f86f2, #a65ff2, #f25fd0, #f25f61, #f2cb5f, #abf25f, #5ff281, #5ff2f0);
  background-size: 300% 300%;
  background-position: 0 50%;
  border-radius: calc(2 * var(--border-width));
  animation: moveGradient 4s alternate infinite;
}

@keyframes moveGradient {
  50% {
    background-position: 100% 50%;
  }
}
</style>
