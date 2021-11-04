## Backend

### Pod

#### YAML

kind: Pod  
apiVersion: v1  
metadata:  
  generateName: backendv4-4-  
  annotations:  
    k8s.v1.cni.cncf.io/network-status: |-  
      [{  
          "name": "",  
          "interface": "eth0",  
          "ips": [  
              "10.15.2.196"  
          ],  
          "default": true,  
          "dns": {}  
      }]  
    k8s.v1.cni.cncf.io/networks-status: |-  
      [{  
          "name": "",  
          "interface": "eth0",  
          "ips": [  
              "10.15.2.196"  
          ],  
          "default": true,  
          "dns": {}  
      }]  
    kubernetes.io/limit-ranger: >-  
      LimitRanger plugin set: cpu, memory request for container backendv4; cpu,  
      memory limit for container backendv4  
    openshift.io/deployment-config.latest-version: '4'  
    openshift.io/deployment-config.name: backendv4  
    openshift.io/deployment.name: backendv4-4  
    openshift.io/scc: restricted  
  selfLink: /api/v1/namespaces/taudinpurkauspeli2021/pods/backendv4-4-q5hrv  
  resourceVersion: '253542775'  
  name: backendv4-4-q5hrv  
  uid: 6cef9824-4f66-4407-b283-e58191475daf  
  creationTimestamp: '2021-10-26T11:40:43Z'  
  managedFields:  
    - manager: kube-controller-manager  
      operation: Update  
      apiVersion: v1  
      time: '2021-10-26T11:40:43Z'  
      fieldsType: FieldsV1  
      fieldsV1:  
        'f:metadata':  
          'f:annotations':  
            .: {}  
            'f:openshift.io/deployment-config.latest-version': {}  
            'f:openshift.io/deployment-config.name': {}  
            'f:openshift.io/deployment.name': {}  
          'f:generateName': {}  
          'f:labels':  
            .: {}  
            'f:app': {}  
            'f:deployment': {}  
            'f:deploymentconfig': {}  
          'f:ownerReferences':  
            .: {}  
            'k:{"uid":"c215e803-5a3b-49fe-9eba-0cc306bb7f40"}':  
              .: {}  
              'f:apiVersion': {}  
              'f:blockOwnerDeletion': {}  
              'f:controller': {}  
              'f:kind': {}  
              'f:name': {}  
              'f:uid': {}  
        'f:spec':  
          'f:containers':  
            'k:{"name":"backendv4"}':  
              .: {}  
              'f:image': {}  
              'f:imagePullPolicy': {}  
              'f:name': {}  
              'f:ports':  
                .: {}  
                'k:{"containerPort":8080,"protocol":"TCP"}':  
                  .: {}  
                  'f:containerPort': {}  
                  'f:protocol': {}  
              'f:resources': {}  
              'f:terminationMessagePath': {}  
              'f:terminationMessagePolicy': {}  
          'f:dnsPolicy': {}  
          'f:enableServiceLinks': {}  
          'f:restartPolicy': {}  
          'f:schedulerName': {}  
          'f:securityContext': {}  
          'f:terminationGracePeriodSeconds': {}  
    - manager: multus  
      operation: Update  
      apiVersion: v1  
      time: '2021-10-26T11:40:45Z'  
      fieldsType: FieldsV1  
      fieldsV1:  
        'f:metadata':  
          'f:annotations':  
            'f:k8s.v1.cni.cncf.io/network-status': {}  
            'f:k8s.v1.cni.cncf.io/networks-status': {}  
    - manager: kubelet  
      operation: Update  
      apiVersion: v1  
      time: '2021-10-26T11:40:46Z'  
      fieldsType: FieldsV1  
      fieldsV1:  
        'f:status':  
          'f:conditions':  
            'k:{"type":"ContainersReady"}':  
              .: {}  
              'f:lastProbeTime': {}  
              'f:lastTransitionTime': {}  
              'f:status': {}  
              'f:type': {}  
            'k:{"type":"Initialized"}':  
              .: {}  
              'f:lastProbeTime': {}  
              'f:lastTransitionTime': {}  
              'f:status': {}  
              'f:type': {}  
            'k:{"type":"Ready"}':  
              .: {}  
              'f:lastProbeTime': {}  
              'f:lastTransitionTime': {}  
              'f:status': {}  
              'f:type': {}  
          'f:containerStatuses': {}  
          'f:hostIP': {}  
          'f:phase': {}  
          'f:podIP': {}  
          'f:podIPs':  
            .: {}  
            'k:{"ip":"10.15.2.196"}':  
              .: {}  
              'f:ip': {}  
          'f:startTime': {}  
  namespace: taudinpurkauspeli2021  
  ownerReferences:  
    - apiVersion: v1  
      kind: ReplicationController  
      name: backendv4-4  
      uid: c215e803-5a3b-49fe-9eba-0cc306bb7f40  
      controller: true  
      blockOwnerDeletion: true  
  labels:  
    app: backendv4  
    deployment: backendv4-4  
    deploymentconfig: backendv4  
spec:  
  nodeSelector:  
    node-role.kubernetes.io/app: ''  
  restartPolicy: Always  
  serviceAccountName: default  
  imagePullSecrets:  
    - name: default-dockercfg-c6kmz
  priority: 0  
  schedulerName: default-scheduler  
  enableServiceLinks: true  
  terminationGracePeriodSeconds: 30  
  preemptionPolicy: PreemptLowerPriority  
  nodeName: worker-0.ocp-prod-0.k8s.it.helsinki.fi  
  securityContext:  
    seLinuxOptions:  
      level: 's0:c31,c25'  
    fsGroup: 1000980000  
  containers:  
    - resources:  
        limits:  
          cpu: 50 0m  
          memory: 500Mi  
        requests:  
          cpu: 10m  
          memory: 100Mi  
      terminationMessagePath: /dev/termination-log  
      name: backendv4  
      securityContext:  
        capabilities:  
          drop:  
            - KILL  
            - MKNOD  
            - SETGID  
            - SETUID  
        runAsUser: 1000980000  
      ports:  
        - containerPort: 8080  
          protocol: TCP  
      imagePullPolicy: Always  
      volumeMounts:  
        - name: default-token-tszlj  
          readOnly: true  
          mountPath: /var/run/secrets/kubernetes.io/serviceaccount  
      terminationMessagePolicy: File  
      image: >-  
        image-registry.openshift-image-registry.svc:5000/taudinpurkauspeli2021/backendv4@sha256:fd4f463fcbb6b1e93ac58a83ada28ce5d5c19be5c218ce5dcd01290ffa6fed78  
  serviceAccount: default  
  volumes:  
    - name: default-token-tszlj  
      secret:  
        secretName: default-token-tszlj  
        defaultMode: 420  
  dnsPolicy: ClusterFirst  
  tolerations:  
    - key: node.kubernetes.io/not-ready  
      operator: Exists  
      effect: NoExecute  
      tolerationSeconds: 300  
    - key: node.kubernetes.io/unreachable  
      operator: Exists  
      effect: NoExecute  
      tolerationSeconds: 300  
    - key: node.kubernetes.io/memory-pressure  
      operator: Exists  
      effect: NoSchedule  
status:  
  phase: Running  
  conditions:  
    - type: Initialized  
      status: 'True'  
      lastProbeTime: null  
      lastTransitionTime: '2021-10-26T11:40:43Z'  
    - type: Ready  
      status: 'True'  
      lastProbeTime: null  
      lastTransitionTime: '2021-10-26T11:40:46Z'  
    - type: ContainersReady  
      status: 'True'  
      lastProbeTime: null  
      lastTransitionTime: '2021-10-26T11:40:46Z'  
    - type: PodScheduled  
      status: 'True'  
      lastProbeTime: null  
      lastTransitionTime: '2021-10-26T11:40:43Z'  
  hostIP: 128.214.137.9  
  podIP: 10.15.2.196  
  podIPs:  
    - ip: 10.15.2.196  
  startTime: '2021-10-26T11:40:43Z'  
  containerStatuses:  
    - restartCount: 0  
      started: true  
      ready: true  
      name: backendv4  
      state:  
        running:  
          startedAt: '2021-10-26T11:40:46Z'  
      imageID: >-  
        image-registry.openshift-image-registry.svc:5000/taudinpurkauspeli2021/backendv4@sha256:fd4f463fcbb6b1e93ac58a83ada28ce5d5c19be5c218ce5dcd01290ffa6fed78  
      image: >-  
        image-registry.openshift-image-registry.svc:5000/taudinpurkauspeli2021/backendv4@sha256:fd4f463fcbb6b1e93ac58a83ada28ce5d5c19be5c218ce5dcd01290ffa6fed78  
      lastState: {}  
      containerID: 'cri-o://2cd44d6b2fe8583cd7e78d543a6a0a8fad845f60d22e97058529f257a44a48e8'  
  qosClass: Burstable  

### Service

#### YAML

kind: Service  
apiVersion: v1  
metadata:  
  annotations:  
    app.openshift.io/vcs-ref: ''  
    app.openshift.io/vcs-uri: 'https://github.com/taudinpurkauspeli/taudinpurkauspeli2021/'  
    openshift.io/generated-by: OpenShiftWebConsole  
  selfLink: /api/v1/namespaces/taudinpurkauspeli2021/services/backendv4  
  resourceVersion: '251069080'  
  name: backendv4  
  uid: 2c564187-c20b-4fe8-9ec7-ea9f5c23cdc0  
  creationTimestamp: '2021-10-21T09:57:45Z'  
  managedFields:  
    - manager: Mozilla  
      operation: Update  
      apiVersion: v1  
      time: '2021-10-21T09:57:45Z'  
      fieldsType: FieldsV1  
      fieldsV1:  
        'f:metadata':  
          'f:annotations':  
            .: {}  
            'f:app.openshift.io/vcs-ref': {}  
            'f:app.openshift.io/vcs-uri': {}  
            'f:openshift.io/generated-by': {}  
          'f:labels':  
            .: {}  
            'f:app': {}  
            'f:app.kubernetes.io/component': {}  
            'f:app.kubernetes.io/instance': {}  
            'f:app.kubernetes.io/name': {}  
            'f:app.kubernetes.io/part-of': {}  
            'f:app.openshift.io/runtime': {}  
            'f:app.openshift.io/runtime-version': {}  
        'f:spec':  
          'f:ports':  
            .: {}  
            'k:{"port":8080,"protocol":"TCP"}':  
              .: {}  
              'f:name': {}  
              'f:port': {}  
              'f:protocol': {}  
              'f:targetPort': {}  
          'f:selector':  
            .: {}  
            'f:app': {}  
            'f:deploymentconfig': {}  
          'f:sessionAffinity': {}  
          'f:type': {}  
  namespace: taudinpurkauspeli2021  
  labels:  
    app: backendv4  
    app.kubernetes.io/component: backendv4  
    app.kubernetes.io/instance: backendv4  
    app.kubernetes.io/name: nodejs  
    app.kubernetes.io/part-of: appv4  
    app.openshift.io/runtime: nodejs  
    app.openshift.io/runtime-version: 14-ubi7  
spec:  
  ports:  
    - name: 8080-tcp  
      protocol: TCP  
      port: 8080  
      targetPort: 8080  
  selector:  
    app: backendv4  
    deploymentconfig: backendv4  
  clusterIP: 172.30.195.18  
  clusterIPs:  
    - 172.30.195.18  
  type: ClusterIP  
  sessionAffinity: None  
status:  
  loadBalancer: {}  

### Route

#### YAML

kind: Route
apiVersion: route.openshift.io/v1
metadata:
  name: backendv4
  namespace: taudinpurkauspeli2021
  uid: 8bcedbe3-92e9-4830-b134-a48521cdfbec
  resourceVersion: '253461407'
  creationTimestamp: '2021-10-21T09:57:45Z'
  labels:
    app: backendv4
    app.kubernetes.io/component: backendv4
    app.kubernetes.io/instance: backendv4
    app.kubernetes.io/name: nodejs
    app.kubernetes.io/part-of: appv4
    app.openshift.io/runtime: nodejs
    app.openshift.io/runtime-version: 14-ubi7
  annotations:
    openshift.io/host.generated: 'true'
  managedFields:
    - manager: openshift-router
      operation: Update
      apiVersion: route.openshift.io/v1
      time: '2021-10-21T09:57:45Z'
      fieldsType: FieldsV1
      fieldsV1:
        'f:status':
          'f:ingress': {}
    - manager: Mozilla
      operation: Update
      apiVersion: route.openshift.io/v1
      time: '2021-10-26T07:40:18Z'
      fieldsType: FieldsV1
      fieldsV1:
        'f:metadata':
          'f:labels':
            .: {}
            'f:app': {}
            'f:app.kubernetes.io/component': {}
            'f:app.kubernetes.io/instance': {}
            'f:app.kubernetes.io/name': {}
            'f:app.kubernetes.io/part-of': {}
            'f:app.openshift.io/runtime': {}
            'f:app.openshift.io/runtime-version': {}
        'f:spec':
          'f:port':
            .: {}
            'f:targetPort': {}
          'f:tls':
            .: {}
            'f:insecureEdgeTerminationPolicy': {}
            'f:termination': {}
          'f:to':
            'f:kind': {}
            'f:name': {}
            'f:weight': {}
          'f:wildcardPolicy': {}
spec:
  host: backendv4-taudinpurkauspeli2021.apps.ocp-prod-0.k8s.it.helsinki.fi
  to:
    kind: Service
    name: backendv4
    weight: 100
  port:
    targetPort: 8080-tcp
  tls:
    termination: edge
    insecureEdgeTerminationPolicy: Redirect
  wildcardPolicy: None
status:
  ingress:
    - host: backendv4-taudinpurkauspeli2021.apps.ocp-prod-0.k8s.it.helsinki.fi
      routerName: default
      conditions:
        - type: Admitted
          status: 'True'
          lastTransitionTime: '2021-10-21T09:57:45Z'
      wildcardPolicy: None
      routerCanonicalHostname: apps.ocp-prod-0.k8s.it.helsinki.fi

### Build

#### YAML 

kind: BuildConfig
apiVersion: build.openshift.io/v1
metadata:
  annotations:
    app.openshift.io/vcs-ref: ''
    app.openshift.io/vcs-uri: 'https://github.com/taudinpurkauspeli/taudinpurkauspeli2021/'
    openshift.io/generated-by: OpenShiftWebConsole
  resourceVersion: '253105380'
  name: backendv4
  uid: 9d2268d3-95ee-4a57-9ad7-4fa727fdfaa4
  creationTimestamp: '2021-10-21T09:57:44Z'
  generation: 7
  managedFields:
    - manager: Mozilla
      operation: Update
      apiVersion: build.openshift.io/v1
      time: '2021-10-21T09:57:44Z'
      fieldsType: FieldsV1
      fieldsV1:
        'f:metadata':
          'f:annotations':
            .: {}
            'f:app.openshift.io/vcs-ref': {}
            'f:app.openshift.io/vcs-uri': {}
            'f:openshift.io/generated-by': {}
          'f:labels':
            .: {}
            'f:app': {}
            'f:app.kubernetes.io/component': {}
            'f:app.kubernetes.io/instance': {}
            'f:app.kubernetes.io/name': {}
            'f:app.kubernetes.io/part-of': {}
            'f:app.openshift.io/runtime': {}
            'f:app.openshift.io/runtime-version': {}
        'f:spec':
          'f:output':
            'f:to':
              .: {}
              'f:kind': {}
              'f:name': {}
          'f:runPolicy': {}
          'f:source':
            'f:contextDir': {}
            'f:git':
              .: {}
              'f:uri': {}
            'f:type': {}
          'f:strategy':
            'f:sourceStrategy':
              .: {}
              'f:env': {}
              'f:from':
                .: {}
                'f:kind': {}
                'f:name': {}
                'f:namespace': {}
            'f:type': {}
    - manager: openshift-apiserver
      operation: Update
      apiVersion: build.openshift.io/v1
      time: '2021-10-21T09:57:44Z'
      fieldsType: FieldsV1
      fieldsV1:
        'f:spec':
          'f:triggers': {}
        'f:status':
          'f:lastVersion': {}
  namespace: taudinpurkauspeli2021
  labels:
    app: backendv4
    app.kubernetes.io/component: backendv4
    app.kubernetes.io/instance: backendv4
    app.kubernetes.io/name: nodejs
    app.kubernetes.io/part-of: appv4
    app.openshift.io/runtime: nodejs
    app.openshift.io/runtime-version: 14-ubi7
spec:
  nodeSelector: null
  output:
    to:
      kind: ImageStreamTag
      name: 'backendv4:latest'
  resources: {}
  successfulBuildsHistoryLimit: 5
  failedBuildsHistoryLimit: 5
  strategy:
    type: Source
    sourceStrategy:
      from:
        kind: ImageStreamTag
        namespace: openshift
        name: 'nodejs:14-ubi7'
      env:
        - name: DB_USERNAME
          valueFrom:
            secretKeyRef:
              name: postgresql-persistent-parameters-692n7
              key: POSTGRESQL_USER
        - name: DB_PASSWORD
          valueFrom:
            secretKeyRef:
              name: postgresql-persistent-parameters-692n7
              key: POSTGRESQL_PASSWORD
        - name: POSTGRESQL_DATABASE
          valueFrom:
            secretKeyRef:
              name: postgresql-persistent-parameters-692n7
              key: POSTGRESQL_DATABASE
        - name: DB_HOST
          value: postgresql
        - name: PORT
          value: '8080'
  postCommit: {}
  source:
    type: Git
    git:
      uri: 'https://github.com/taudinpurkauspeli/taudinpurkauspeli2021/'
    contextDir: /taudinpurkauspeli/backend
  triggers:
    - type: Generic
      generic:
        secretReference:
          name: backendv4-generic-webhook-secret
    - type: ImageChange
      imageChange:
        lastTriggeredImageID: >-
          image-registry.openshift-image-registry.svc:5000/openshift/nodejs@sha256:0442577b0599cbd98fdb6f62c6cc3e0b235b503406d75cb458088c644a052ffc
    - type: ConfigChange
  runPolicy: Serial
status:
  lastVersion: 4

## Frontend

### Pod

kind: Pod
apiVersion: v1
metadata:
  generateName: frontendv4-7f8f8f4469-
  annotations:
    k8s.v1.cni.cncf.io/network-status: |-
      [{
          "name": "",
          "interface": "eth0",
          "ips": [
              "10.15.2.197"
          ],
          "default": true,
          "dns": {}
      }]
    k8s.v1.cni.cncf.io/networks-status: |-
      [{
          "name": "",
          "interface": "eth0",
          "ips": [
              "10.15.2.197"
          ],
          "default": true,
          "dns": {}
      }]
    kubernetes.io/limit-ranger: >-
      LimitRanger plugin set: cpu, memory request for container frontendv4; cpu,
      memory limit for container frontendv4
    openshift.io/scc: restricted
  selfLink: /api/v1/namespaces/taudinpurkauspeli2021/pods/frontendv4-7f8f8f4469-wztjb
  resourceVersion: '253543433'
  name: frontendv4-7f8f8f4469-wztjb
  uid: deba2e8e-b434-4184-98b9-05fbee2c603f
  creationTimestamp: '2021-10-26T11:42:37Z'
  managedFields:
    - manager: kube-controller-manager
      operation: Update
      apiVersion: v1
      time: '2021-10-26T11:42:37Z'
      fieldsType: FieldsV1
      fieldsV1:
        'f:metadata':
          'f:generateName': {}
          'f:labels':
            .: {}
            'f:app': {}
            'f:deploymentconfig': {}
            'f:pod-template-hash': {}
          'f:ownerReferences':
            .: {}
            'k:{"uid":"e3869035-4d22-4876-9822-ce9fd8903b46"}':
              .: {}
              'f:apiVersion': {}
              'f:blockOwnerDeletion': {}
              'f:controller': {}
              'f:kind': {}
              'f:name': {}
              'f:uid': {}
        'f:spec':
          'f:containers':
            'k:{"name":"frontendv4"}':
              .: {}
              'f:image': {}
              'f:imagePullPolicy': {}
              'f:name': {}
              'f:ports':
                .: {}
                'k:{"containerPort":8080,"protocol":"TCP"}':
                  .: {}
                  'f:containerPort': {}
                  'f:protocol': {}
              'f:resources': {}
              'f:terminationMessagePath': {}
              'f:terminationMessagePolicy': {}
          'f:dnsPolicy': {}
          'f:enableServiceLinks': {}
          'f:restartPolicy': {}
          'f:schedulerName': {}
          'f:securityContext': {}
          'f:terminationGracePeriodSeconds': {}
    - manager: multus
      operation: Update
      apiVersion: v1
      time: '2021-10-26T11:42:39Z'
      fieldsType: FieldsV1
      fieldsV1:
        'f:metadata':
          'f:annotations':
            'f:k8s.v1.cni.cncf.io/network-status': {}
            'f:k8s.v1.cni.cncf.io/networks-status': {}
    - manager: kubelet
      operation: Update
      apiVersion: v1
      time: '2021-10-26T11:42:40Z'
      fieldsType: FieldsV1
      fieldsV1:
        'f:status':
          'f:conditions':
            'k:{"type":"ContainersReady"}':
              .: {}
              'f:lastProbeTime': {}
              'f:lastTransitionTime': {}
              'f:status': {}
              'f:type': {}
            'k:{"type":"Initialized"}':
              .: {}
              'f:lastProbeTime': {}
              'f:lastTransitionTime': {}
              'f:status': {}
              'f:type': {}
            'k:{"type":"Ready"}':
              .: {}
              'f:lastProbeTime': {}
              'f:lastTransitionTime': {}
              'f:status': {}
              'f:type': {}
          'f:containerStatuses': {}
          'f:hostIP': {}
          'f:phase': {}
          'f:podIP': {}
          'f:podIPs':
            .: {}
            'k:{"ip":"10.15.2.197"}':
              .: {}
              'f:ip': {}
          'f:startTime': {}
  namespace: taudinpurkauspeli2021
  ownerReferences:
    - apiVersion: apps/v1
      kind: ReplicaSet
      name: frontendv4-7f8f8f4469
      uid: e3869035-4d22-4876-9822-ce9fd8903b46
      controller: true
      blockOwnerDeletion: true
  labels:
    app: frontendv4
    deploymentconfig: frontendv4
    pod-template-hash: 7f8f8f4469
spec:
  nodeSelector:
    node-role.kubernetes.io/app: ''
  restartPolicy: Always
  serviceAccountName: default
  imagePullSecrets:
    - name: default-dockercfg-c6kmz
  priority: 0
  schedulerName: default-scheduler
  enableServiceLinks: true
  terminationGracePeriodSeconds: 30
  preemptionPolicy: PreemptLowerPriority
  nodeName: worker-0.ocp-prod-0.k8s.it.helsinki.fi
  securityContext:
    seLinuxOptions:
      level: 's0:c31,c25'
    fsGroup: 1000980000
  containers:
    - resources:
        limits:
          cpu: 500m
          memory: 500Mi
        requests:
          cpu: 10m
          memory: 100Mi
      terminationMessagePath: /dev/termination-log
      name: frontendv4
      securityContext:
        capabilities:
          drop:
            - KILL
            - MKNOD
            - SETGID
            - SETUID
        runAsUser: 1000980000
      ports:
        - containerPort: 8080
          protocol: TCP
      imagePullPolicy: Always
      volumeMounts:
        - name: default-token-tszlj
          readOnly: true
          mountPath: /var/run/secrets/kubernetes.io/serviceaccount
      terminationMessagePolicy: File
      image: >-
        image-registry.openshift-image-registry.svc:5000/taudinpurkauspeli2021/frontendv4@sha256:3d9c4dd446345ed14a365ee1bb535d044eab79fe66d1cf4b001a2477f6df074f
  serviceAccount: default
  volumes:
    - name: default-token-tszlj
      secret:
        secretName: default-token-tszlj
        defaultMode: 420
  dnsPolicy: ClusterFirst
  tolerations:
    - key: node.kubernetes.io/not-ready
      operator: Exists
      effect: NoExecute
      tolerationSeconds: 300
    - key: node.kubernetes.io/unreachable
      operator: Exists
      effect: NoExecute
      tolerationSeconds: 300
    - key: node.kubernetes.io/memory-pressure
      operator: Exists
      effect: NoSchedule
status:
  phase: Running
  conditions:
    - type: Initialized
      status: 'True'
      lastProbeTime: null
      lastTransitionTime: '2021-10-26T11:42:37Z'
    - type: Ready
      status: 'True'
      lastProbeTime: null
      lastTransitionTime: '2021-10-26T11:42:40Z'
    - type: ContainersReady
      status: 'True'
      lastProbeTime: null
      lastTransitionTime: '2021-10-26T11:42:40Z'
    - type: PodScheduled
      status: 'True'
      lastProbeTime: null
      lastTransitionTime: '2021-10-26T11:42:37Z'
  hostIP: 128.214.137.9
  podIP: 10.15.2.197
  podIPs:
    - ip: 10.15.2.197
  startTime: '2021-10-26T11:42:37Z'
  containerStatuses:
    - restartCount: 0
      started: true
      ready: true
      name: frontendv4
      state:
        running:
          startedAt: '2021-10-26T11:42:40Z'
      imageID: >-
        image-registry.openshift-image-registry.svc:5000/taudinpurkauspeli2021/frontendv4@sha256:3d9c4dd446345ed14a365ee1bb535d044eab79fe66d1cf4b001a2477f6df074f
      image: >-
        image-registry.openshift-image-registry.svc:5000/taudinpurkauspeli2021/frontendv4@sha256:3d9c4dd446345ed14a365ee1bb535d044eab79fe66d1cf4b001a2477f6df074f
      lastState: {}
      containerID: 'cri-o://3570cde315235c339f7bb792817ab1ed05b2947dd3421de73a82323c110c24a1'
  qosClass: Burstable

### Service 

#### YAML

kind: Service
apiVersion: v1
metadata:
  annotations:
    app.openshift.io/vcs-ref: ''
    app.openshift.io/vcs-uri: 'https://github.com/amalia53/taudinpurkaus'
    openshift.io/generated-by: OpenShiftWebConsole
  selfLink: /api/v1/namespaces/taudinpurkauspeli2021/services/frontendv4
  resourceVersion: '253090851'
  name: frontendv4
  uid: 5595778c-d6f0-40ad-8ee7-8fe3a24c6ba3
  creationTimestamp: '2021-09-30T14:41:30Z'
  managedFields:
    - manager: Mozilla
      operation: Update
      apiVersion: v1
      time: '2021-10-25T13:28:01Z'
      fieldsType: FieldsV1
      fieldsV1:
        'f:metadata':
          'f:annotations':
            .: {}
            'f:app.openshift.io/vcs-ref': {}
            'f:app.openshift.io/vcs-uri': {}
            'f:openshift.io/generated-by': {}
          'f:labels':
            .: {}
            'f:app': {}
            'f:app.kubernetes.io/component': {}
            'f:app.kubernetes.io/instance': {}
            'f:app.kubernetes.io/name': {}
            'f:app.kubernetes.io/part-of': {}
            'f:app.openshift.io/runtime': {}
            'f:app.openshift.io/runtime-version': {}
        'f:spec':
          'f:ports':
            .: {}
            'k:{"port":8081,"protocol":"TCP"}':
              .: {}
              'f:name': {}
              'f:port': {}
              'f:protocol': {}
              'f:targetPort': {}
          'f:selector':
            .: {}
            'f:app': {}
            'f:deploymentconfig': {}
          'f:sessionAffinity': {}
          'f:type': {}
  namespace: taudinpurkauspeli2021
  labels:
    app: frontendv4
    app.kubernetes.io/component: frontendv4
    app.kubernetes.io/instance: frontendv4
    app.kubernetes.io/name: nodejs
    app.kubernetes.io/part-of: appv4
    app.openshift.io/runtime: nodejs
    app.openshift.io/runtime-version: 14-ubi7
spec:
  ports:
    - name: 8081-tcp
      protocol: TCP
      port: 8081
      targetPort: 8081
  selector:
    app: frontendv4
    deploymentconfig: frontendv4
  clusterIP: 172.30.25.142
  clusterIPs:
    - 172.30.25.142
  type: ClusterIP
  sessionAffinity: None
status:
  loadBalancer: {}

### Route

#### YAML

kind: Route
apiVersion: route.openshift.io/v1
metadata:
  name: frontendv4
  namespace: taudinpurkauspeli2021
  uid: d53f232f-1af3-4421-99af-4f5a38f7e2d9
  resourceVersion: '253090737'
  creationTimestamp: '2021-09-30T14:41:30Z'
  labels:
    app: frontendv4
    app.kubernetes.io/component: frontendv4
    app.kubernetes.io/instance: frontendv4
    app.kubernetes.io/name: nodejs
    app.kubernetes.io/part-of: appv4
    app.openshift.io/runtime: nodejs
    app.openshift.io/runtime-version: 14-ubi7
  annotations:
    openshift.io/host.generated: 'true'
  managedFields:
    - manager: openshift-router
      operation: Update
      apiVersion: route.openshift.io/v1
      time: '2021-09-30T14:41:31Z'
      fieldsType: FieldsV1
      fieldsV1:
        'f:status':
          'f:ingress': {}
    - manager: Mozilla
      operation: Update
      apiVersion: route.openshift.io/v1
      time: '2021-10-02T09:39:13Z'
      fieldsType: FieldsV1
      fieldsV1:
        'f:metadata':
          'f:labels':
            .: {}
            'f:app': {}
            'f:app.kubernetes.io/component': {}
            'f:app.kubernetes.io/instance': {}
            'f:app.kubernetes.io/name': {}
            'f:app.kubernetes.io/part-of': {}
            'f:app.openshift.io/runtime': {}
            'f:app.openshift.io/runtime-version': {}
        'f:spec':
          'f:port':
            .: {}
            'f:targetPort': {}
          'f:tls':
            .: {}
            'f:insecureEdgeTerminationPolicy': {}
            'f:termination': {}
          'f:to':
            'f:kind': {}
            'f:name': {}
            'f:weight': {}
          'f:wildcardPolicy': {}
spec:
  host: frontendv4-taudinpurkauspeli2021.apps.ocp-prod-0.k8s.it.helsinki.fi
  to:
    kind: Service
    name: frontendv4
    weight: 100
  port:
    targetPort: 8081-tcp
  tls:
    termination: edge
    insecureEdgeTerminationPolicy: Redirect
  wildcardPolicy: None
status:
  ingress:
    - host: frontendv4-taudinpurkauspeli2021.apps.ocp-prod-0.k8s.it.helsinki.fi
      routerName: default
      conditions:
        - type: Admitted
          status: 'True'
          lastTransitionTime: '2021-09-30T14:41:31Z'
      wildcardPolicy: None
      routerCanonicalHostname: apps.ocp-prod-0.k8s.it.helsinki.fi

### Build

#### YAML

kind: BuildConfig
apiVersion: build.openshift.io/v1
metadata:
  annotations:
    app.openshift.io/vcs-ref: ''
    app.openshift.io/vcs-uri: 'https://github.com/taudinpurkauspeli/taudinpurkauspeli2021'
    openshift.io/generated-by: OpenShiftWebConsole
  resourceVersion: '253537368'
  name: frontendv4
  uid: a9e8f176-8c59-4e91-9bae-7228abaecda2
  creationTimestamp: '2021-09-30T14:41:30Z'
  generation: 19
  managedFields:
    - manager: Mozilla
      operation: Update
      apiVersion: build.openshift.io/v1
      time: '2021-09-30T14:41:30Z'
      fieldsType: FieldsV1
      fieldsV1:
        'f:metadata':
          'f:annotations':
            .: {}
            'f:app.openshift.io/vcs-ref': {}
            'f:app.openshift.io/vcs-uri': {}
            'f:openshift.io/generated-by': {}
          'f:labels':
            .: {}
            'f:app': {}
            'f:app.kubernetes.io/component': {}
            'f:app.kubernetes.io/instance': {}
            'f:app.kubernetes.io/name': {}
            'f:app.kubernetes.io/part-of': {}
            'f:app.openshift.io/runtime': {}
            'f:app.openshift.io/runtime-version': {}
        'f:spec':
          'f:output':
            'f:to':
              .: {}
              'f:kind': {}
              'f:name': {}
          'f:runPolicy': {}
          'f:source':
            'f:contextDir': {}
            'f:git':
              .: {}
              'f:uri': {}
            'f:type': {}
          'f:strategy':
            'f:sourceStrategy':
              .: {}
              'f:from':
                .: {}
                'f:kind': {}
                'f:name': {}
                'f:namespace': {}
            'f:type': {}
    - manager: openshift-apiserver
      operation: Update
      apiVersion: build.openshift.io/v1
      time: '2021-09-30T14:41:31Z'
      fieldsType: FieldsV1
      fieldsV1:
        'f:spec':
          'f:triggers': {}
        'f:status':
          'f:lastVersion': {}
  namespace: taudinpurkauspeli2021
  labels:
    app: frontendv4
    app.kubernetes.io/component: frontendv4
    app.kubernetes.io/instance: frontendv4
    app.kubernetes.io/name: nodejs
    app.kubernetes.io/part-of: appv4
    app.openshift.io/runtime: nodejs
    app.openshift.io/runtime-version: 14-ubi7
spec:
  nodeSelector: null
  output:
    to:
      kind: ImageStreamTag
      name: 'frontendv4:latest'
  resources: {}
  successfulBuildsHistoryLimit: 5
  failedBuildsHistoryLimit: 5
  strategy:
    type: Source
    sourceStrategy:
      from:
        kind: ImageStreamTag
        namespace: openshift
        name: 'nodejs:14-ubi7'
  postCommit: {}
  source:
    type: Git
    git:
      uri: 'https://github.com/taudinpurkauspeli/taudinpurkauspeli2021'
    contextDir: /taudinpurkauspeli/frontend
  triggers:
    - type: Generic
      generic:
        secretReference:
          name: frontendv4-generic-webhook-secret
    - type: GitHub
      github:
        secretReference:
          name: frontendv4-github-webhook-secret
    - type: ImageChange
      imageChange:
        lastTriggeredImageID: >-
          image-registry.openshift-image-registry.svc:5000/openshift/nodejs@sha256:0442577b0599cbd98fdb6f62c6cc3e0b235b503406d75cb458088c644a052ffc
    - type: ConfigChange
  runPolicy: Serial
status:
  lastVersion: 16

## Postgresql

### Pod

#### YAML 

kind: Pod
apiVersion: v1
metadata:
  generateName: postgresql-2-
  annotations:
    k8s.v1.cni.cncf.io/network-status: |-
      [{
          "name": "",
          "interface": "eth0",
          "ips": [
              "10.15.2.192"
          ],
          "default": true,
          "dns": {}
      }]
    k8s.v1.cni.cncf.io/networks-status: |-
      [{
          "name": "",
          "interface": "eth0",
          "ips": [
              "10.15.2.192"
          ],
          "default": true,
          "dns": {}
      }]
    kubernetes.io/limit-ranger: >-
      LimitRanger plugin set: cpu request for container postgresql; cpu limit
      for container postgresql
    openshift.io/deployment-config.latest-version: '2'
    openshift.io/deployment-config.name: postgresql
    openshift.io/deployment.name: postgresql-2
    openshift.io/scc: restricted
  selfLink: /api/v1/namespaces/taudinpurkauspeli2021/pods/postgresql-2-bjd9f
  resourceVersion: '253540766'
  name: postgresql-2-bjd9f
  uid: 2db4566a-3f52-4325-889d-da4cdc534f04
  creationTimestamp: '2021-10-26T11:34:32Z'
  managedFields:
    - manager: kube-controller-manager
      operation: Update
      apiVersion: v1
      time: '2021-10-26T11:34:32Z'
      fieldsType: FieldsV1
      fieldsV1:
        'f:metadata':
          'f:annotations':
            .: {}
            'f:openshift.io/deployment-config.latest-version': {}
            'f:openshift.io/deployment-config.name': {}
            'f:openshift.io/deployment.name': {}
          'f:generateName': {}
          'f:labels':
            .: {}
            'f:deployment': {}
            'f:deploymentconfig': {}
            'f:name': {}
          'f:ownerReferences':
            .: {}
            'k:{"uid":"03a8733f-7ae3-4731-9ad2-7d252a8bf182"}':
              .: {}
              'f:apiVersion': {}
              'f:blockOwnerDeletion': {}
              'f:controller': {}
              'f:kind': {}
              'f:name': {}
              'f:uid': {}
        'f:spec':
          'f:containers':
            'k:{"name":"postgresql"}':
              'f:image': {}
              'f:volumeMounts':
                .: {}
                'k:{"mountPath":"/var/lib/pgsql/data"}':
                  .: {}
                  'f:mountPath': {}
                  'f:name': {}
              'f:terminationMessagePolicy': {}
              .: {}
              'f:resources':
                .: {}
                'f:limits':
                  .: {}
                  'f:memory': {}
                'f:requests':
                  .: {}
                  'f:memory': {}
              'f:livenessProbe':
                .: {}
                'f:exec':
                  .: {}
                  'f:command': {}
                'f:failureThreshold': {}
                'f:initialDelaySeconds': {}
                'f:periodSeconds': {}
                'f:successThreshold': {}
                'f:timeoutSeconds': {}
              'f:env':
                .: {}
                'k:{"name":"POSTGRESQL_DATABASE"}':
                  .: {}
                  'f:name': {}
                  'f:valueFrom':
                    .: {}
                    'f:secretKeyRef':
                      .: {}
                      'f:key': {}
                      'f:name': {}
                'k:{"name":"POSTGRESQL_PASSWORD"}':
                  .: {}
                  'f:name': {}
                  'f:valueFrom':
                    .: {}
                    'f:secretKeyRef':
                      .: {}
                      'f:key': {}
                      'f:name': {}
                'k:{"name":"POSTGRESQL_USER"}':
                  .: {}
                  'f:name': {}
                  'f:valueFrom':
                    .: {}
                    'f:secretKeyRef':
                      .: {}
                      'f:key': {}
                      'f:name': {}
              'f:readinessProbe':
                .: {}
                'f:exec':
                  .: {}
                  'f:command': {}
                'f:failureThreshold': {}
                'f:initialDelaySeconds': {}
                'f:periodSeconds': {}
                'f:successThreshold': {}
                'f:timeoutSeconds': {}
              'f:securityContext':
                .: {}
                'f:capabilities': {}
                'f:privileged': {}
              'f:terminationMessagePath': {}
              'f:imagePullPolicy': {}
              'f:ports':
                .: {}
                'k:{"containerPort":5432,"protocol":"TCP"}':
                  .: {}
                  'f:containerPort': {}
                  'f:protocol': {}
              'f:name': {}
          'f:dnsPolicy': {}
          'f:enableServiceLinks': {}
          'f:restartPolicy': {}
          'f:schedulerName': {}
          'f:securityContext': {}
          'f:terminationGracePeriodSeconds': {}
          'f:volumes':
            .: {}
            'k:{"name":"postgresql-data"}':
              .: {}
              'f:name': {}
              'f:persistentVolumeClaim':
                .: {}
                'f:claimName': {}
    - manager: multus
      operation: Update
      apiVersion: v1
      time: '2021-10-26T11:34:43Z'
      fieldsType: FieldsV1
      fieldsV1:
        'f:metadata':
          'f:annotations':
            'f:k8s.v1.cni.cncf.io/network-status': {}
            'f:k8s.v1.cni.cncf.io/networks-status': {}
    - manager: kubelet
      operation: Update
      apiVersion: v1
      time: '2021-10-26T11:34:58Z'
      fieldsType: FieldsV1
      fieldsV1:
        'f:status':
          'f:conditions':
            'k:{"type":"ContainersReady"}':
              .: {}
              'f:lastProbeTime': {}
              'f:lastTransitionTime': {}
              'f:status': {}
              'f:type': {}
            'k:{"type":"Initialized"}':
              .: {}
              'f:lastProbeTime': {}
              'f:lastTransitionTime': {}
              'f:status': {}
              'f:type': {}
            'k:{"type":"Ready"}':
              .: {}
              'f:lastProbeTime': {}
              'f:lastTransitionTime': {}
              'f:status': {}
              'f:type': {}
          'f:containerStatuses': {}
          'f:hostIP': {}
          'f:phase': {}
          'f:podIP': {}
          'f:podIPs':
            .: {}
            'k:{"ip":"10.15.2.192"}':
              .: {}
              'f:ip': {}
          'f:startTime': {}
  namespace: taudinpurkauspeli2021
  ownerReferences:
    - apiVersion: v1
      kind: ReplicationController
      name: postgresql-2
      uid: 03a8733f-7ae3-4731-9ad2-7d252a8bf182
      controller: true
      blockOwnerDeletion: true
  labels:
    deployment: postgresql-2
    deploymentconfig: postgresql
    name: postgresql
spec:
  nodeSelector:
    node-role.kubernetes.io/app: ''
  restartPolicy: Always
  serviceAccountName: default
  imagePullSecrets:
    - name: default-dockercfg-c6kmz
  priority: 0
  schedulerName: default-scheduler
  enableServiceLinks: true
  terminationGracePeriodSeconds: 30
  preemptionPolicy: PreemptLowerPriority
  nodeName: worker-0.ocp-prod-0.k8s.it.helsinki.fi
  securityContext:
    seLinuxOptions:
      level: 's0:c31,c25'
    fsGroup: 1000980000
  containers:
    - resources:
        limits:
          cpu: 500m
          memory: 512Mi
        requests:
          cpu: 10m
          memory: 512Mi
      readinessProbe:
        exec:
          command:
            - /usr/libexec/check-container
        initialDelaySeconds: 5
        timeoutSeconds: 1
        periodSeconds: 10
        successThreshold: 1
        failureThreshold: 3
      terminationMessagePath: /dev/termination-log
      name: postgresql
      livenessProbe:
        exec:
          command:
            - /usr/libexec/check-container
            - '--live'
        initialDelaySeconds: 120
        timeoutSeconds: 10
        periodSeconds: 10
        successThreshold: 1
        failureThreshold: 3
      env:
        - name: POSTGRESQL_USER
          valueFrom:
            secretKeyRef:
              name: postgresql
              key: database-user
        - name: POSTGRESQL_PASSWORD
          valueFrom:
            secretKeyRef:
              name: postgresql
              key: database-password
        - name: POSTGRESQL_DATABASE
          valueFrom:
            secretKeyRef:
              name: postgresql
              key: database-name
      securityContext:
        capabilities:
          drop:
            - KILL
            - MKNOD
            - SETGID
            - SETUID
        privileged: false
        runAsUser: 1000980000
      ports:
        - containerPort: 5432
          protocol: TCP
      imagePullPolicy: IfNotPresent
      volumeMounts:
        - name: postgresql-data
          mountPath: /var/lib/pgsql/data
        - name: default-token-tszlj
          readOnly: true
          mountPath: /var/run/secrets/kubernetes.io/serviceaccount
      terminationMessagePolicy: File
      image: >-
        image-registry.openshift-image-registry.svc:5000/openshift/postgresql@sha256:a49b7d567962fae7cb0749a11f81dc8a0c9470a909a56b81da49240f55aea5de
  serviceAccount: default
  volumes:
    - name: postgresql-data
      persistentVolumeClaim:
        claimName: taudinpurkaus11
    - name: default-token-tszlj
      secret:
        secretName: default-token-tszlj
        defaultMode: 420
  dnsPolicy: ClusterFirst
  tolerations:
    - key: node.kubernetes.io/not-ready
      operator: Exists
      effect: NoExecute
      tolerationSeconds: 300
    - key: node.kubernetes.io/unreachable
      operator: Exists
      effect: NoExecute
      tolerationSeconds: 300
    - key: node.kubernetes.io/memory-pressure
      operator: Exists
      effect: NoSchedule
status:
  phase: Running
  conditions:
    - type: Initialized
      status: 'True'
      lastProbeTime: null
      lastTransitionTime: '2021-10-26T11:34:32Z'
    - type: Ready
      status: 'True'
      lastProbeTime: null
      lastTransitionTime: '2021-10-26T11:34:58Z'
    - type: ContainersReady
      status: 'True'
      lastProbeTime: null
      lastTransitionTime: '2021-10-26T11:34:58Z'
    - type: PodScheduled
      status: 'True'
      lastProbeTime: null
      lastTransitionTime: '2021-10-26T11:34:32Z'
  hostIP: 128.214.137.9
  podIP: 10.15.2.192
  podIPs:
    - ip: 10.15.2.192
  startTime: '2021-10-26T11:34:32Z'
  containerStatuses:
    - restartCount: 0
      started: true
      ready: true
      name: postgresql
      state:
        running:
          startedAt: '2021-10-26T11:34:43Z'
      imageID: >-
        image-registry.openshift-image-registry.svc:5000/openshift/postgresql@sha256:a49b7d567962fae7cb0749a11f81dc8a0c9470a909a56b81da49240f55aea5de
      image: >-
        image-registry.openshift-image-registry.svc:5000/openshift/postgresql@sha256:a49b7d567962fae7cb0749a11f81dc8a0c9470a909a56b81da49240f55aea5de
      lastState: {}
      containerID: 'cri-o://f8fb62e3be098b43fd58d04714c28aad38054468b9f77fba8bfc3734cd5c7304'
  qosClass: Burstable

### Service

#### YAML

kind: Service
apiVersion: v1
metadata:
  annotations:
    template.openshift.io/expose-uri: 'postgres://{.spec.clusterIP}:{.spec.ports[?(.name=="postgresql")].port}'
  selfLink: /api/v1/namespaces/taudinpurkauspeli2021/services/postgresql
  resourceVersion: '251552296'
  name: postgresql
  uid: 1d48f852-8e69-4ab5-a55f-87412dec2f67
  creationTimestamp: '2021-10-01T10:24:49Z'
  managedFields:
    - manager: openshift-controller-manager
      operation: Update
      apiVersion: v1
      time: '2021-10-01T10:24:49Z'
      fieldsType: FieldsV1
      fieldsV1:
        'f:metadata':
          'f:annotations':
            .: {}
            'f:template.openshift.io/expose-uri': {}
          'f:labels':
            .: {}
            'f:template': {}
            'f:template.openshift.io/template-instance-owner': {}
        'f:spec':
          'f:ports':
            .: {}
            'k:{"port":5432,"protocol":"TCP"}':
              .: {}
              'f:name': {}
              'f:port': {}
              'f:protocol': {}
              'f:targetPort': {}
          'f:selector':
            .: {}
            'f:name': {}
          'f:sessionAffinity': {}
    - manager: Mozilla
      operation: Update
      apiVersion: v1
      time: '2021-10-03T18:34:29Z'
      fieldsType: FieldsV1
      fieldsV1:
        'f:spec':
          'f:externalTrafficPolicy': {}
          'f:ports':
            'k:{"port":5432,"protocol":"TCP"}':
              .: {}
              'f:name': {}
              'f:port': {}
              'f:protocol': {}
              'f:targetPort': {}
          'f:type': {}
  namespace: taudinpurkauspeli2021
  labels:
    template: postgresql-persistent-template
    template.openshift.io/template-instance-owner: 37f83c6a-742d-4fb5-a93b-f09a5922e820
spec:
  ports:
    - name: postgresql
      protocol: TCP
      port: 5432
      targetPort: 5432
  selector:
    name: postgresql
  clusterIP: 172.30.141.247
  clusterIPs:
    - 172.30.141.247
  type: ClusterIP
  sessionAffinity: None
status:
  loadBalancer: {}

## my-app

## Pod my-app-8655bbc4cd-wvfp7

## YAML

kind: Pod
apiVersion: v1
metadata:
  generateName: my-app-8655bbc4cd-
  annotations:
    k8s.v1.cni.cncf.io/network-status: |-
      [{
          "name": "",
          "interface": "eth0",
          "ips": [
              "10.12.4.38"
          ],
          "default": true,
          "dns": {}
      }]
    k8s.v1.cni.cncf.io/networks-status: |-
      [{
          "name": "",
          "interface": "eth0",
          "ips": [
              "10.12.4.38"
          ],
          "default": true,
          "dns": {}
      }]
    kubernetes.io/limit-ranger: >-
      LimitRanger plugin set: cpu, memory request for container shibd; cpu,
      memory limit for container shibd; cpu, memory request for container httpd;
      cpu, memory limit for container httpd
    openshift.io/scc: restricted
  selfLink: /api/v1/namespaces/taudinpurkauspeli2021/pods/my-app-8655bbc4cd-wvfp7
  resourceVersion: '253456226'
  name: my-app-8655bbc4cd-wvfp7
  uid: ae59a18b-63c4-4ed2-abcd-8bf3bef21c29
  creationTimestamp: '2021-10-26T07:25:03Z'
  managedFields:
    - manager: kube-controller-manager
      operation: Update
      apiVersion: v1
      time: '2021-10-26T07:25:03Z'
      fieldsType: FieldsV1
      fieldsV1:
        'f:metadata':
          'f:generateName': {}
          'f:labels':
            .: {}
            'f:app': {}
            'f:pod-template-hash': {}
          'f:ownerReferences':
            .: {}
            'k:{"uid":"518dc2f6-3529-4da5-b1b4-392097f13309"}':
              .: {}
              'f:apiVersion': {}
              'f:blockOwnerDeletion': {}
              'f:controller': {}
              'f:kind': {}
              'f:name': {}
              'f:uid': {}
        'f:spec':
          'f:volumes':
            .: {}
            'k:{"name":"httpd-config"}':
              .: {}
              'f:configMap':
                .: {}
                'f:defaultMode': {}
                'f:name': {}
              'f:name': {}
            'k:{"name":"shib-config"}':
              .: {}
              'f:configMap':
                .: {}
                'f:defaultMode': {}
                'f:name': {}
              'f:name': {}
            'k:{"name":"shib-secrets"}':
              .: {}
              'f:name': {}
              'f:secret':
                .: {}
                'f:defaultMode': {}
                'f:secretName': {}
          'f:containers':
            'k:{"name":"httpd"}':
              'f:image': {}
              'f:volumeMounts':
                .: {}
                'k:{"mountPath":"/opt/app-root/etc/httpd.d"}':
                  .: {}
                  'f:mountPath': {}
                  'f:name': {}
                  'f:readOnly': {}
                'k:{"mountPath":"/shib-config"}':
                  .: {}
                  'f:mountPath': {}
                  'f:name': {}
                  'f:readOnly': {}
                'k:{"mountPath":"/shib-secrets"}':
                  .: {}
                  'f:mountPath': {}
                  'f:name': {}
                  'f:readOnly': {}
              'f:terminationMessagePolicy': {}
              .: {}
              'f:resources': {}
              'f:terminationMessagePath': {}
              'f:imagePullPolicy': {}
              'f:ports':
                .: {}
                'k:{"containerPort":8080,"protocol":"TCP"}':
                  .: {}
                  'f:containerPort': {}
                  'f:protocol': {}
              'f:name': {}
            'k:{"name":"shibd"}':
              'f:image': {}
              'f:volumeMounts':
                .: {}
                'k:{"mountPath":"/shib-config"}':
                  .: {}
                  'f:mountPath': {}
                  'f:name': {}
                  'f:readOnly': {}
                'k:{"mountPath":"/shib-secrets"}':
                  .: {}
                  'f:mountPath': {}
                  'f:name': {}
                  'f:readOnly': {}
              'f:terminationMessagePolicy': {}
              .: {}
              'f:resources': {}
              'f:terminationMessagePath': {}
              'f:imagePullPolicy': {}
              'f:ports':
                .: {}
                'k:{"containerPort":1600,"protocol":"TCP"}':
                  .: {}
                  'f:containerPort': {}
                  'f:protocol': {}
              'f:name': {}
          'f:dnsPolicy': {}
          'f:restartPolicy': {}
          'f:schedulerName': {}
          'f:terminationGracePeriodSeconds': {}
          'f:enableServiceLinks': {}
          'f:securityContext': {}
          'f:affinity':
            .: {}
            'f:podAntiAffinity':
              .: {}
              'f:preferredDuringSchedulingIgnoredDuringExecution': {}
    - manager: multus
      operation: Update
      apiVersion: v1
      time: '2021-10-26T07:25:05Z'
      fieldsType: FieldsV1
      fieldsV1:
        'f:metadata':
          'f:annotations':
            'f:k8s.v1.cni.cncf.io/network-status': {}
            'f:k8s.v1.cni.cncf.io/networks-status': {}
    - manager: kubelet
      operation: Update
      apiVersion: v1
      time: '2021-10-26T07:25:09Z'
      fieldsType: FieldsV1
      fieldsV1:
        'f:status':
          'f:conditions':
            'k:{"type":"ContainersReady"}':
              .: {}
              'f:lastProbeTime': {}
              'f:lastTransitionTime': {}
              'f:status': {}
              'f:type': {}
            'k:{"type":"Initialized"}':
              .: {}
              'f:lastProbeTime': {}
              'f:lastTransitionTime': {}
              'f:status': {}
              'f:type': {}
            'k:{"type":"Ready"}':
              .: {}
              'f:lastProbeTime': {}
              'f:lastTransitionTime': {}
              'f:status': {}
              'f:type': {}
          'f:containerStatuses': {}
          'f:hostIP': {}
          'f:phase': {}
          'f:podIP': {}
          'f:podIPs':
            .: {}
            'k:{"ip":"10.12.4.38"}':
              .: {}
              'f:ip': {}
          'f:startTime': {}
  namespace: taudinpurkauspeli2021
  ownerReferences:
    - apiVersion: apps/v1
      kind: ReplicaSet
      name: my-app-8655bbc4cd
      uid: 518dc2f6-3529-4da5-b1b4-392097f13309
      controller: true
      blockOwnerDeletion: true
  labels:
    app: my-app
    pod-template-hash: 8655bbc4cd
spec:
  nodeSelector:
    node-role.kubernetes.io/app: ''
  restartPolicy: Always
  serviceAccountName: default
  imagePullSecrets:
    - name: default-dockercfg-c6kmz
  priority: 0
  schedulerName: default-scheduler
  enableServiceLinks: true
  affinity:
    podAntiAffinity:
      preferredDuringSchedulingIgnoredDuringExecution:
        - weight: 100
          podAffinityTerm:
            labelSelector:
              matchExpressions:
                - key: app
                  operator: In
                  values:
                    - my-app
            topologyKey: kubernetes.io/hostname
  terminationGracePeriodSeconds: 30
  preemptionPolicy: PreemptLowerPriority
  nodeName: worker-3.ocp-prod-0.k8s.it.helsinki.fi
  securityContext:
    seLinuxOptions:
      level: 's0:c31,c25'
    fsGroup: 1000980000
  containers:
    - resources:
        limits:
          cpu: 500m
          memory: 500Mi
        requests:
          cpu: 10m
          memory: 100Mi
      terminationMessagePath: /dev/termination-log
      name: shibd
      securityContext:
        capabilities:
          drop:
            - KILL
            - MKNOD
            - SETGID
            - SETUID
        runAsUser: 1000980000
      ports:
        - containerPort: 1600
          protocol: TCP
      imagePullPolicy: Always
      volumeMounts:
        - name: shib-secrets
          readOnly: true
          mountPath: /shib-secrets
        - name: shib-config
          readOnly: true
          mountPath: /shib-config
        - name: default-token-tszlj
          readOnly: true
          mountPath: /var/run/secrets/kubernetes.io/serviceaccount
      terminationMessagePolicy: File
      image: 'quay.io/tike/openshift-sp-shibd:latest'
    - resources:
        limits:
          cpu: 500m
          memory: 500Mi
        requests:
          cpu: 10m
          memory: 100Mi
      terminationMessagePath: /dev/termination-log
      name: httpd
      securityContext:
        capabilities:
          drop:
            - KILL
            - MKNOD
            - SETGID
            - SETUID
        runAsUser: 1000980000
      ports:
        - containerPort: 8080
          protocol: TCP
      imagePullPolicy: Always
      volumeMounts:
        - name: shib-secrets
          readOnly: true
          mountPath: /shib-secrets
        - name: shib-config
          readOnly: true
          mountPath: /shib-config
        - name: httpd-config
          readOnly: true
          mountPath: /opt/app-root/etc/httpd.d
        - name: default-token-tszlj
          readOnly: true
          mountPath: /var/run/secrets/kubernetes.io/serviceaccount
      terminationMessagePolicy: File
      image: 'quay.io/tike/openshift-sp-httpd:latest'
  serviceAccount: default
  volumes:
    - name: shib-secrets
      secret:
        secretName: shib-secrets
        defaultMode: 420
    - name: shib-config
      configMap:
        name: shib-config
        defaultMode: 420
    - name: httpd-config
      configMap:
        name: httpd-config
        defaultMode: 420
    - name: default-token-tszlj
      secret:
        secretName: default-token-tszlj
        defaultMode: 420
  dnsPolicy: ClusterFirst
  tolerations:
    - key: node.kubernetes.io/not-ready
      operator: Exists
      effect: NoExecute
      tolerationSeconds: 300
    - key: node.kubernetes.io/unreachable
      operator: Exists
      effect: NoExecute
      tolerationSeconds: 300
    - key: node.kubernetes.io/memory-pressure
      operator: Exists
      effect: NoSchedule
status:
  phase: Running
  conditions:
    - type: Initialized
      status: 'True'
      lastProbeTime: null
      lastTransitionTime: '2021-10-26T07:25:03Z'
    - type: Ready
      status: 'True'
      lastProbeTime: null
      lastTransitionTime: '2021-10-26T07:25:09Z'
    - type: ContainersReady
      status: 'True'
      lastProbeTime: null
      lastTransitionTime: '2021-10-26T07:25:09Z'
    - type: PodScheduled
      status: 'True'
      lastProbeTime: null
      lastTransitionTime: '2021-10-26T07:25:03Z'
  hostIP: 128.214.137.12
  podIP: 10.12.4.38
  podIPs:
    - ip: 10.12.4.38
  startTime: '2021-10-26T07:25:03Z'
  containerStatuses:
    - restartCount: 0
      started: true
      ready: true
      name: httpd
      state:
        running:
          startedAt: '2021-10-26T07:25:09Z'
      imageID: >-
        image-registry.openshift-image-registry.svc:5000/taudinpurkauspeli2021/openshift-sp-httpd@sha256:682fb7b6fffa6e5e74c882461aeefbc988d5ef358d3181b68fe2d1162fbc9f48
      image: 'quay.io/tike/openshift-sp-httpd:latest'
      lastState: {}
      containerID: 'cri-o://eed50bf5b820a3ee966acbfc8b5a6f786c6bd138bbbebf32f67c30aaaab97ba2'
    - restartCount: 0
      started: true
      ready: true
      name: shibd
      state:
        running:
          startedAt: '2021-10-26T07:25:07Z'
      imageID: >-
        quay.io/tike/openshift-sp-shibd@sha256:05a172739546b1d11082722179ecc913c3aa135fb934a36609111c158aeed746
      image: 'quay.io/tike/openshift-sp-shibd:latest'
      lastState: {}
      containerID: 'cri-o://8fd0605b2790c863a9cc6659332e4cd724f2673b49beacb800be687cf6c9a707'
  qosClass: Burstable

### Pod my-app-8655bbc4cd-9jz4v

#### YAML

kind: Pod
apiVersion: v1
metadata:
  generateName: my-app-8655bbc4cd-
  annotations:
    k8s.v1.cni.cncf.io/network-status: |-
      [{
          "name": "",
          "interface": "eth0",
          "ips": [
              "10.15.2.137"
          ],
          "default": true,
          "dns": {}
      }]
    k8s.v1.cni.cncf.io/networks-status: |-
      [{
          "name": "",
          "interface": "eth0",
          "ips": [
              "10.15.2.137"
          ],
          "default": true,
          "dns": {}
      }]
    kubernetes.io/limit-ranger: >-
      LimitRanger plugin set: cpu, memory request for container shibd; cpu,
      memory limit for container shibd; cpu, memory request for container httpd;
      cpu, memory limit for container httpd
    openshift.io/scc: restricted
  selfLink: /api/v1/namespaces/taudinpurkauspeli2021/pods/my-app-8655bbc4cd-9jz4v
  resourceVersion: '253455871'
  name: my-app-8655bbc4cd-9jz4v
  uid: 2c59153d-2188-4cde-ab9e-c10220e7b717
  creationTimestamp: '2021-10-26T07:24:12Z'
  managedFields:
    - manager: kube-controller-manager
      operation: Update
      apiVersion: v1
      time: '2021-10-26T07:24:12Z'
      fieldsType: FieldsV1
      fieldsV1:
        'f:metadata':
          'f:generateName': {}
          'f:labels':
            .: {}
            'f:app': {}
            'f:pod-template-hash': {}
          'f:ownerReferences':
            .: {}
            'k:{"uid":"518dc2f6-3529-4da5-b1b4-392097f13309"}':
              .: {}
              'f:apiVersion': {}
              'f:blockOwnerDeletion': {}
              'f:controller': {}
              'f:kind': {}
              'f:name': {}
              'f:uid': {}
        'f:spec':
          'f:volumes':
            .: {}
            'k:{"name":"httpd-config"}':
              .: {}
              'f:configMap':
                .: {}
                'f:defaultMode': {}
                'f:name': {}
              'f:name': {}
            'k:{"name":"shib-config"}':
              .: {}
              'f:configMap':
                .: {}
                'f:defaultMode': {}
                'f:name': {}
              'f:name': {}
            'k:{"name":"shib-secrets"}':
              .: {}
              'f:name': {}
              'f:secret':
                .: {}
                'f:defaultMode': {}
                'f:secretName': {}
          'f:containers':
            'k:{"name":"httpd"}':
              'f:image': {}
              'f:volumeMounts':
                .: {}
                'k:{"mountPath":"/opt/app-root/etc/httpd.d"}':
                  .: {}
                  'f:mountPath': {}
                  'f:name': {}
                  'f:readOnly': {}
                'k:{"mountPath":"/shib-config"}':
                  .: {}
                  'f:mountPath': {}
                  'f:name': {}
                  'f:readOnly': {}
                'k:{"mountPath":"/shib-secrets"}':
                  .: {}
                  'f:mountPath': {}
                  'f:name': {}
                  'f:readOnly': {}
              'f:terminationMessagePolicy': {}
              .: {}
              'f:resources': {}
              'f:terminationMessagePath': {}
              'f:imagePullPolicy': {}
              'f:ports':
                .: {}
                'k:{"containerPort":8080,"protocol":"TCP"}':
                  .: {}
                  'f:containerPort': {}
                  'f:protocol': {}
              'f:name': {}
            'k:{"name":"shibd"}':
              'f:image': {}
              'f:volumeMounts':
                .: {}
                'k:{"mountPath":"/shib-config"}':
                  .: {}
                  'f:mountPath': {}
                  'f:name': {}
                  'f:readOnly': {}
                'k:{"mountPath":"/shib-secrets"}':
                  .: {}
                  'f:mountPath': {}
                  'f:name': {}
                  'f:readOnly': {}
              'f:terminationMessagePolicy': {}
              .: {}
              'f:resources': {}
              'f:terminationMessagePath': {}
              'f:imagePullPolicy': {}
              'f:ports':
                .: {}
                'k:{"containerPort":1600,"protocol":"TCP"}':
                  .: {}
                  'f:containerPort': {}
                  'f:protocol': {}
              'f:name': {}
          'f:dnsPolicy': {}
          'f:restartPolicy': {}
          'f:schedulerName': {}
          'f:terminationGracePeriodSeconds': {}
          'f:enableServiceLinks': {}
          'f:securityContext': {}
          'f:affinity':
            .: {}
            'f:podAntiAffinity':
              .: {}
              'f:preferredDuringSchedulingIgnoredDuringExecution': {}
    - manager: multus
      operation: Update
      apiVersion: v1
      time: '2021-10-26T07:24:14Z'
      fieldsType: FieldsV1
      fieldsV1:
        'f:metadata':
          'f:annotations':
            'f:k8s.v1.cni.cncf.io/network-status': {}
            'f:k8s.v1.cni.cncf.io/networks-status': {}
    - manager: kubelet
      operation: Update
      apiVersion: v1
      time: '2021-10-26T07:24:19Z'
      fieldsType: FieldsV1
      fieldsV1:
        'f:status':
          'f:conditions':
            'k:{"type":"ContainersReady"}':
              .: {}
              'f:lastProbeTime': {}
              'f:lastTransitionTime': {}
              'f:status': {}
              'f:type': {}
            'k:{"type":"Initialized"}':
              .: {}
              'f:lastProbeTime': {}
              'f:lastTransitionTime': {}
              'f:status': {}
              'f:type': {}
            'k:{"type":"Ready"}':
              .: {}
              'f:lastProbeTime': {}
              'f:lastTransitionTime': {}
              'f:status': {}
              'f:type': {}
          'f:containerStatuses': {}
          'f:hostIP': {}
          'f:phase': {}
          'f:podIP': {}
          'f:podIPs':
            .: {}
            'k:{"ip":"10.15.2.137"}':
              .: {}
              'f:ip': {}
          'f:startTime': {}
  namespace: taudinpurkauspeli2021
  ownerReferences:
    - apiVersion: apps/v1
      kind: ReplicaSet
      name: my-app-8655bbc4cd
      uid: 518dc2f6-3529-4da5-b1b4-392097f13309
      controller: true
      blockOwnerDeletion: true
  labels:
    app: my-app
    pod-template-hash: 8655bbc4cd
spec:
  nodeSelector:
    node-role.kubernetes.io/app: ''
  restartPolicy: Always
  serviceAccountName: default
  imagePullSecrets:
    - name: default-dockercfg-c6kmz
  priority: 0
  schedulerName: default-scheduler
  enableServiceLinks: true
  affinity:
    podAntiAffinity:
      preferredDuringSchedulingIgnoredDuringExecution:
        - weight: 100
          podAffinityTerm:
            labelSelector:
              matchExpressions:
                - key: app
                  operator: In
                  values:
                    - my-app
            topologyKey: kubernetes.io/hostname
  terminationGracePeriodSeconds: 30
  preemptionPolicy: PreemptLowerPriority
  nodeName: worker-0.ocp-prod-0.k8s.it.helsinki.fi
  securityContext:
    seLinuxOptions:
      level: 's0:c31,c25'
    fsGroup: 1000980000
  containers:
    - resources:
        limits:
          cpu: 500m
          memory: 500Mi
        requests:
          cpu: 10m
          memory: 100Mi
      terminationMessagePath: /dev/termination-log
      name: shibd
      securityContext:
        capabilities:
          drop:
            - KILL
            - MKNOD
            - SETGID
            - SETUID
        runAsUser: 1000980000
      ports:
        - containerPort: 1600
          protocol: TCP
      imagePullPolicy: Always
      volumeMounts:
        - name: shib-secrets
          readOnly: true
          mountPath: /shib-secrets
        - name: shib-config
          readOnly: true
          mountPath: /shib-config
        - name: default-token-tszlj
          readOnly: true
          mountPath: /var/run/secrets/kubernetes.io/serviceaccount
      terminationMessagePolicy: File
      image: 'quay.io/tike/openshift-sp-shibd:latest'
    - resources:
        limits:
          cpu: 500m
          memory: 500Mi
        requests:
          cpu: 10m
          memory: 100Mi
      terminationMessagePath: /dev/termination-log
      name: httpd
      securityContext:
        capabilities:
          drop:
            - KILL
            - MKNOD
            - SETGID
            - SETUID
        runAsUser: 1000980000
      ports:
        - containerPort: 8080
          protocol: TCP
      imagePullPolicy: Always
      volumeMounts:
        - name: shib-secrets
          readOnly: true
          mountPath: /shib-secrets
        - name: shib-config
          readOnly: true
          mountPath: /shib-config
        - name: httpd-config
          readOnly: true
          mountPath: /opt/app-root/etc/httpd.d
        - name: default-token-tszlj
          readOnly: true
          mountPath: /var/run/secrets/kubernetes.io/serviceaccount
      terminationMessagePolicy: File
      image: 'quay.io/tike/openshift-sp-httpd:latest'
  serviceAccount: default
  volumes:
    - name: shib-secrets
      secret:
        secretName: shib-secrets
        defaultMode: 420
    - name: shib-config
      configMap:
        name: shib-config
        defaultMode: 420
    - name: httpd-config
      configMap:
        name: httpd-config
        defaultMode: 420
    - name: default-token-tszlj
      secret:
        secretName: default-token-tszlj
        defaultMode: 420
  dnsPolicy: ClusterFirst
  tolerations:
    - key: node.kubernetes.io/not-ready
      operator: Exists
      effect: NoExecute
      tolerationSeconds: 300
    - key: node.kubernetes.io/unreachable
      operator: Exists
      effect: NoExecute
      tolerationSeconds: 300
    - key: node.kubernetes.io/memory-pressure
      operator: Exists
      effect: NoSchedule
status:
  phase: Running
  conditions:
    - type: Initialized
      status: 'True'
      lastProbeTime: null
      lastTransitionTime: '2021-10-26T07:24:12Z'
    - type: Ready
      status: 'True'
      lastProbeTime: null
      lastTransitionTime: '2021-10-26T07:24:18Z'
    - type: ContainersReady
      status: 'True'
      lastProbeTime: null
      lastTransitionTime: '2021-10-26T07:24:18Z'
    - type: PodScheduled
      status: 'True'
      lastProbeTime: null
      lastTransitionTime: '2021-10-26T07:24:12Z'
  hostIP: 128.214.137.9
  podIP: 10.15.2.137
  podIPs:
    - ip: 10.15.2.137
  startTime: '2021-10-26T07:24:12Z'
  containerStatuses:
    - restartCount: 0
      started: true
      ready: true
      name: httpd
      state:
        running:
          startedAt: '2021-10-26T07:24:18Z'
      imageID: >-
        quay.io/tike/openshift-sp-httpd@sha256:682fb7b6fffa6e5e74c882461aeefbc988d5ef358d3181b68fe2d1162fbc9f48
      image: 'quay.io/tike/openshift-sp-httpd:latest'
      lastState: {}
      containerID: 'cri-o://355a3b51c7786322afbf13a125a0e7defd72a2af39f1fbf0904d4235b295e624'
    - restartCount: 0
      started: true
      ready: true
      name: shibd
      state:
        running:
          startedAt: '2021-10-26T07:24:16Z'
      imageID: >-
        quay.io/tike/openshift-sp-shibd@sha256:05a172739546b1d11082722179ecc913c3aa135fb934a36609111c158aeed746
      image: 'quay.io/tike/openshift-sp-shibd:latest'
      lastState: {}
      containerID: 'cri-o://14dcb28994e3433120433f349dc61e09484a79342c1359e226b474a92eace638'
  qosClass: Burstable

### Service

#### YAML

kind: Service
apiVersion: v1
metadata:
  name: my-app
  namespace: taudinpurkauspeli2021
  selfLink: /api/v1/namespaces/taudinpurkauspeli2021/services/my-app
  uid: 07ba472b-3396-40e2-b5cb-14194e1e7d27
  resourceVersion: '253465874'
  creationTimestamp: '2021-10-14T11:21:18Z'
  labels:
    app: my-app
  managedFields:
    - manager: Mozilla
      operation: Update
      apiVersion: v1
      time: '2021-10-26T07:53:32Z'
      fieldsType: FieldsV1
      fieldsV1:
        'f:metadata':
          'f:labels':
            .: {}
            'f:app': {}
        'f:spec':
          'f:ports':
            .: {}
            'k:{"port":8080,"protocol":"TCP"}':
              .: {}
              'f:name': {}
              'f:port': {}
              'f:protocol': {}
              'f:targetPort': {}
          'f:selector':
            .: {}
            'f:app': {}
          'f:sessionAffinity': {}
          'f:type': {}
spec:
  ports:
    - name: 8080-tcp
      protocol: TCP
      port: 8080
      targetPort: 8080
  selector:
    app: my-app
  clusterIP: 172.30.75.127
  clusterIPs:
    - 172.30.75.127
  type: ClusterIP
  sessionAffinity: None
status:
  loadBalancer: {}

### Route

#### YAML

kind: Route
apiVersion: route.openshift.io/v1
metadata:
  name: my-app
  namespace: taudinpurkauspeli2021
  uid: 8eb59c00-4a18-445c-b431-2d0d60e79993
  resourceVersion: '247630896'
  creationTimestamp: '2021-10-14T11:22:38Z'
  labels:
    app: my-app
  managedFields:
    - manager: Mozilla
      operation: Update
      apiVersion: route.openshift.io/v1
      time: '2021-10-14T11:22:38Z'
      fieldsType: FieldsV1
      fieldsV1:
        'f:metadata':
          'f:labels':
            .: {}
            'f:app': {}
        'f:spec':
          'f:host': {}
          'f:port':
            .: {}
            'f:targetPort': {}
          'f:tls':
            .: {}
            'f:insecureEdgeTerminationPolicy': {}
            'f:termination': {}
          'f:to':
            'f:kind': {}
            'f:name': {}
            'f:weight': {}
          'f:wildcardPolicy': {}
    - manager: openshift-router
      operation: Update
      apiVersion: route.openshift.io/v1
      time: '2021-10-14T11:22:38Z'
      fieldsType: FieldsV1
      fieldsV1:
        'f:status':
          'f:ingress': {}
spec:
  host: my-app-taudinpurkauspeli2021.apps.cluster-name.k8s.it.helsinki.fi
  to:
    kind: Service
    name: my-app
    weight: 100
  port:
    targetPort: 8080-tcp
  tls:
    termination: edge
    insecureEdgeTerminationPolicy: Redirect
  wildcardPolicy: None
status:
  ingress:
    - host: my-app-taudinpurkauspeli2021.apps.cluster-name.k8s.it.helsinki.fi
      routerName: default
      conditions:
        - type: Admitted
          status: 'True'
          lastTransitionTime: '2021-10-14T11:22:38Z'
      wildcardPolicy: None
      routerCanonicalHostname: apps.ocp-prod-0.k8s.it.helsinki.fi
