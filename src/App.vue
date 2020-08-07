<script>
import OSP from "@/osp/OSP";
export default {
  data() {
    return {
      osps: [],
      poolsCount: 100,
      ready: false
    };
  },
  methods: {
    start() {
      this.osps = [];
      for (let i = 1; i <= this.poolsCount; i++) {
        this.osps.push(new OSP(this.rand(6, 100)));
      }
      this.ready = true;
    },

    rand(min, max) {
      return Math.round(Math.random() * (max - min) + min);
    },

    cssClasses(osp, candidate) {
      if (osp.calculatedBestCandidate.index === candidate.index) {
        return "fill-primary";
      }
      if (osp.actualBestCandidate.index === candidate.index) {
        return "fill-secondary";
      }
      if (osp.countToSkip >= candidate.index) {
        return "fill-black";
      }
      if (osp.countToSkip < candidate.index) {
        return "fill-grey-darker";
      }
    }
  },
  computed: {
    successRate() {
      const successCount = this.osps.filter(
        osp =>
          osp.calculatedBestCandidate.index === osp.actualBestCandidate.index
      ).length;

      return ((successCount / this.osps.length) * 100).toFixed(2);
    }
  }
};
</script>
<template>
  <div id="app">
    <div class="container mx-auto">
      <div class="px-6 lg:px-20 py-4">
        <div class="border-b border-secondary py-10">
          <h1 class="font-bold text-2xl md:text-4xl text-center py-8">
            Optimal Stopping (secretary problem)
          </h1>
          <div class="py-8">
            <img src="@/assets/stop.jpg" alt="stop sign" class="rounded" />
            <div class="text-center py-1 text-sm">
              Photo by
              <a
                href="https://unsplash.com/@cinematicphoto?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText"
                target="_blank"
                >Anwaar Ali</a
              >
              on
              <a
                href="https://unsplash.com/s/photos/stop-sign?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText"
                target="_blank"
                >Unsplash</a
              >
            </div>
          </div>
          <p class="mb-2">
            In mathematics, the theory of optimal stopping or early stopping is
            concerned with the problem of choosing a time to take a particular
            action, in order to maximise an expected reward or minimise an
            expected cost. A key example of an optimal stopping problem is the
            secretary problem. (<a
              href="https://en.wikipedia.org/wiki/Optimal_stopping"
              target="_blank"
              >Wikipedia</a
            >)
          </p>
          <p class="mb-4">
            This page is aimed at demonstrating the
            <span class="code text-primary">n/e</span> rule that states:
            <span class="code"
              >"... The optimal stopping rule prescribes always rejecting the
              first n/e applicants that are interviewed and then stopping at the
              first applicant who is better than every applicant interviewed so
              far."</span
            >
          </p>
          <p>
            You can select the number of pools that will be generated (default
            value is 100), it can be between 5 to 500. Once you hit Start, the
            "pools of candidates" with varying sizes will be generated randomly,
            and the algorithm will automatically run. It will skip the first
            <span class="code text-primary">n/e</span> regardless of their
            qualification score, afterwards it will select the first candidate
            that is better than what it already skipped through, or the last
            candidate if no one is better. Note that the higher the number of
            pools, the more accurate the results will be.
            <br />
            You will be able to see the following stats about each pool:
          </p>
          <ul class="list-disc py-4">
            <li class="mb-2">
              The number of candidates
              <span class="code text-primary">n</span>.
            </li>
            <li class="mb-2">
              The minimum score of the pool
              <span class="code text-primary">minS</span>.
            </li>
            <li class="mb-2">
              The maximum score of the pool
              <span class="code text-primary">maxS</span>.
            </li>
            <li class="mb-2">
              Weather or not the algorithm was successful at selecting the best
              candidates <span class="code text-green">Success</span> or
              <span class="code text-red">Fail</span>.
            </li>
            <li class="mb-2">
              <div class="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  xml:space="preserve"
                  class="w-4 fill-black mr-2"
                >
                  <path
                    d="M511.676,498.752l-12.8-51.2c-6.073-24.838-24.485-44.813-48.747-52.885l-93.867-31.275
                    c-22.891-9.536-33.365-46.4-35.627-60.395c17.442-14.504,28.665-35.14,31.36-57.664c-0.385-3.847,0.523-7.713,2.581-10.987
                    c3.326-0.833,6.049-3.215,7.317-6.4c6.142-14.872,9.997-30.588,11.435-46.613c0.003-0.871-0.104-1.738-0.32-2.581
                    c-1.528-6.227-5.189-11.722-10.347-15.531v-56.555c0-34.368-10.496-48.469-21.547-56.64C339.004,33.472,321.276,0,255.996,0
                    c-57.917,2.332-104.335,48.75-106.667,106.667v56.555c-5.158,3.809-8.819,9.304-10.347,15.531c-0.216,0.843-0.323,1.711-0.32,2.581
                    c1.436,16.033,5.291,31.756,11.435,46.635c0.924,3.015,3.347,5.334,6.4,6.123c1.195,0.597,3.435,3.691,3.435,11.243
                    c2.711,22.588,13.999,43.271,31.531,57.771c-2.24,13.973-12.651,50.816-34.901,60.117l-94.699,31.445
                    c-24.243,8.071-42.643,28.026-48.725,52.843l-12.8,51.2c-1.449,5.71,2.005,11.514,7.715,12.963c0.853,0.217,1.73,0.327,2.61,0.328
                    h490.667c5.891-0.002,10.665-4.779,10.664-10.67C511.993,500.461,511.886,499.595,511.676,498.752z"
                  />
                </svg>
                A candidate that has been skipped
              </div>
            </li>
            <li class="mb-2">
              <div class="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  xml:space="preserve"
                  class="w-4 fill-primary mr-2"
                >
                  <path
                    d="M511.676,498.752l-12.8-51.2c-6.073-24.838-24.485-44.813-48.747-52.885l-93.867-31.275
                    c-22.891-9.536-33.365-46.4-35.627-60.395c17.442-14.504,28.665-35.14,31.36-57.664c-0.385-3.847,0.523-7.713,2.581-10.987
                    c3.326-0.833,6.049-3.215,7.317-6.4c6.142-14.872,9.997-30.588,11.435-46.613c0.003-0.871-0.104-1.738-0.32-2.581
                    c-1.528-6.227-5.189-11.722-10.347-15.531v-56.555c0-34.368-10.496-48.469-21.547-56.64C339.004,33.472,321.276,0,255.996,0
                    c-57.917,2.332-104.335,48.75-106.667,106.667v56.555c-5.158,3.809-8.819,9.304-10.347,15.531c-0.216,0.843-0.323,1.711-0.32,2.581
                    c1.436,16.033,5.291,31.756,11.435,46.635c0.924,3.015,3.347,5.334,6.4,6.123c1.195,0.597,3.435,3.691,3.435,11.243
                    c2.711,22.588,13.999,43.271,31.531,57.771c-2.24,13.973-12.651,50.816-34.901,60.117l-94.699,31.445
                    c-24.243,8.071-42.643,28.026-48.725,52.843l-12.8,51.2c-1.449,5.71,2.005,11.514,7.715,12.963c0.853,0.217,1.73,0.327,2.61,0.328
                    h490.667c5.891-0.002,10.665-4.779,10.664-10.67C511.993,500.461,511.886,499.595,511.676,498.752z"
                  />
                </svg>
                The algorithm's calculated best candidates
              </div>
            </li>
            <li class="mb-2">
              <div class="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  xml:space="preserve"
                  class="w-4 fill-secondary mr-2"
                >
                  <path
                    d="M511.676,498.752l-12.8-51.2c-6.073-24.838-24.485-44.813-48.747-52.885l-93.867-31.275
                    c-22.891-9.536-33.365-46.4-35.627-60.395c17.442-14.504,28.665-35.14,31.36-57.664c-0.385-3.847,0.523-7.713,2.581-10.987
                    c3.326-0.833,6.049-3.215,7.317-6.4c6.142-14.872,9.997-30.588,11.435-46.613c0.003-0.871-0.104-1.738-0.32-2.581
                    c-1.528-6.227-5.189-11.722-10.347-15.531v-56.555c0-34.368-10.496-48.469-21.547-56.64C339.004,33.472,321.276,0,255.996,0
                    c-57.917,2.332-104.335,48.75-106.667,106.667v56.555c-5.158,3.809-8.819,9.304-10.347,15.531c-0.216,0.843-0.323,1.711-0.32,2.581
                    c1.436,16.033,5.291,31.756,11.435,46.635c0.924,3.015,3.347,5.334,6.4,6.123c1.195,0.597,3.435,3.691,3.435,11.243
                    c2.711,22.588,13.999,43.271,31.531,57.771c-2.24,13.973-12.651,50.816-34.901,60.117l-94.699,31.445
                    c-24.243,8.071-42.643,28.026-48.725,52.843l-12.8,51.2c-1.449,5.71,2.005,11.514,7.715,12.963c0.853,0.217,1.73,0.327,2.61,0.328
                    h490.667c5.891-0.002,10.665-4.779,10.664-10.67C511.993,500.461,511.886,499.595,511.676,498.752z"
                  />
                </svg>
                The actual best candidate - only shows when we fail to select
                the best.
              </div>
            </li>
          </ul>
          <p>
            Lastly, you'll be able to see the total success rate that we've had,
            which should be
            <span class="code text-primary">~37%</span>.
          </p>

          <div class="py-4 flex items-center justify-end">
            <div class="flex mr-6">
              <button
                class="w-6 h-6 rounded-full text-white"
                :class="
                  poolsCount !== 5
                    ? 'bg-primary'
                    : 'bg-grey-darker cursor-not-allowed'
                "
                @click="poolsCount--"
                :disabled="poolsCount === 5"
              >
                <svg
                  class="fill-white mx-auto w-3 h-3"
                  viewBox="0 -192 426.66667 426"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="m405.332031 43h-384c-11.773437 0-21.332031-9.558594-21.332031-21.332031 0-11.777344 9.558594-21.335938 21.332031-21.335938h384c11.777344 0 21.335938 9.558594 21.335938 21.335938 0 11.773437-9.558594 21.332031-21.335938 21.332031zm0 0"
                  />
                </svg>
              </button>
              <div class="mx-4">{{ poolsCount }}</div>
              <button
                class="w-6 h-6 rounded-full text-white"
                :class="
                  poolsCount !== 500
                    ? 'bg-primary'
                    : 'bg-gray-400 cursor-not-allowed'
                "
                @click="poolsCount++"
                :disabled="poolsCount === 500"
              >
                <svg
                  class="fill-white mx-auto w-3 h-3"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  viewBox="0 0 512 512"
                >
                  <path
                    d="M492,236H276V20c0-11.046-8.954-20-20-20c-11.046,0-20,8.954-20,20v216H20c-11.046,0-20,8.954-20,20s8.954,20,20,20h216
                            v216c0,11.046,8.954,20,20,20s20-8.954,20-20V276h216c11.046,0,20-8.954,20-20C512,244.954,503.046,236,492,236z"
                  />
                </svg>
              </button>
            </div>
            <button class="btn btn-primary text-lg" @click="start">
              Start
            </button>
          </div>
        </div>

        <div v-if="ready" class="py-10">
          <div class="py-4 text-center text-3xl">
            <span class="text-primary">Total Success Rate:</span>
            {{ successRate }}%
          </div>
          <div v-for="(osp, index) in osps" :key="index" class="my-10">
            <div class="pb-1 flex">
              <div class="mr-4">Pool #{{ index + 1 }}</div>
              <div class="mr-4">
                <span class="text-primary">n</span> = {{ osp.n }};
              </div>
              <div class="mr-4">
                <span class="text-primary">minS</span> = {{ osp.minS }};
              </div>
              <div class="mr-4">
                <span class="text-primary">maxS</span> = {{ osp.maxS }};
              </div>
              <div class="mr-4">
                <span
                  class="text-green"
                  v-if="
                    osp.calculatedBestCandidate.index ===
                      osp.actualBestCandidate.index
                  "
                  >Success</span
                >
                <span class="text-red" v-else>Fail</span>
              </div>
            </div>
            <div class="py-5 border rounded-lg">
              <div class="flex justify-start items-center flex-wrap">
                <div
                  v-for="candidate in osp.pool"
                  :key="candidate.index"
                  class="p-1 candidate"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    xml:space="preserve"
                    class="w-6"
                    :class="cssClasses(osp, candidate)"
                  >
                    <path
                      d="M511.676,498.752l-12.8-51.2c-6.073-24.838-24.485-44.813-48.747-52.885l-93.867-31.275
                    c-22.891-9.536-33.365-46.4-35.627-60.395c17.442-14.504,28.665-35.14,31.36-57.664c-0.385-3.847,0.523-7.713,2.581-10.987
                    c3.326-0.833,6.049-3.215,7.317-6.4c6.142-14.872,9.997-30.588,11.435-46.613c0.003-0.871-0.104-1.738-0.32-2.581
                    c-1.528-6.227-5.189-11.722-10.347-15.531v-56.555c0-34.368-10.496-48.469-21.547-56.64C339.004,33.472,321.276,0,255.996,0
                    c-57.917,2.332-104.335,48.75-106.667,106.667v56.555c-5.158,3.809-8.819,9.304-10.347,15.531c-0.216,0.843-0.323,1.711-0.32,2.581
                    c1.436,16.033,5.291,31.756,11.435,46.635c0.924,3.015,3.347,5.334,6.4,6.123c1.195,0.597,3.435,3.691,3.435,11.243
                    c2.711,22.588,13.999,43.271,31.531,57.771c-2.24,13.973-12.651,50.816-34.901,60.117l-94.699,31.445
                    c-24.243,8.071-42.643,28.026-48.725,52.843l-12.8,51.2c-1.449,5.71,2.005,11.514,7.715,12.963c0.853,0.217,1.73,0.327,2.61,0.328
                    h490.667c5.891-0.002,10.665-4.779,10.664-10.67C511.993,500.461,511.886,499.595,511.676,498.752z"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <footer class="bg-secondary text-white">
      <div class="container mx-auto px-4 md:px-0">
        <div class="flex justify-between py-16">
          <div class="mr-6">
            Hello all, my name is Khalid and I'm a full stack web developer
            based in Dubai, UAE. Check my github over there 👉
            <br />
            <br />
            this is an open source project hosted on
            <a href="https://github.com/khalid-dabjan/optimal-stopping-problem"
              >github</a
            >
            <br />
            For any questions or comments you can reach me on
            <a href="mailto:khalid.dabjan@gmail.com">khalid.dabjan@gmail.com</a>
          </div>
          <div class="flex flex-col items-end">
            <a href="https://github.com/khalid-dabjan" target="_blank">
              <svg
                class="w-6 fill-white"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="m12 .5c-6.63 0-12 5.28-12 11.792 0 5.211 3.438 9.63 8.205 11.188.6.111.82-.254.82-.567 0-.28-.01-1.022-.015-2.005-3.338.711-4.042-1.582-4.042-1.582-.546-1.361-1.335-1.725-1.335-1.725-1.087-.731.084-.716.084-.716 1.205.082 1.838 1.215 1.838 1.215 1.07 1.803 2.809 1.282 3.495.981.108-.763.417-1.282.76-1.577-2.665-.295-5.466-1.309-5.466-5.827 0-1.287.465-2.339 1.235-3.164-.135-.298-.54-1.497.105-3.121 0 0 1.005-.316 3.3 1.209.96-.262 1.98-.392 3-.398 1.02.006 2.04.136 3 .398 2.28-1.525 3.285-1.209 3.285-1.209.645 1.624.24 2.823.12 3.121.765.825 1.23 1.877 1.23 3.164 0 4.53-2.805 5.527-5.475 5.817.42.354.81 1.077.81 2.182 0 1.578-.015 2.846-.015 3.229 0 .309.21.678.825.56 4.801-1.548 8.236-5.97 8.236-11.173 0-6.512-5.373-11.792-12-11.792z"
                />
              </svg>
            </a>
          </div>
        </div>
        <div class="text-sm text-right py-2">
          Icons made by
          <a
            href="https://www.flaticon.com/authors/pixel-perfect"
            title="Pixel perfect"
            target="_blank"
            >Pixel perfect</a
          >
          from
          <a href="https://www.flaticon.com/" title="Flaticon" target="_blank">
            www.flaticon.com</a
          >
        </div>
      </div>
    </footer>
  </div>
</template>
